require("dotenv").config();

const categoryRoutes = require("./routes/categories")
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const paymentRoutes=require("./routes/payment");
const dashboardRoutes = require("./routes/dashboard");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");



const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/api/products", productRoutes);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/cart",cartRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
// models
const User = require("./models/user");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const Order = require("./models/Order");



// ---------------- DB CONNECTION ----------------
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected ✅"))
  .catch((err) => console.log("DB Error:", err));

// ---------------- AUTH MIDDLEWARE ----------------
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "No token ❌" });
    }

    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    const decoded = jwt.verify(
      actualToken,
      process.env.JWT_SECRET || "secretkey"
    );

    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token ❌" });
  }
};

// 🔥 ROLE CHECK MIDDLEWARE (NEW)
const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied 🚫"
      });
    }
    next();
  };
};

// ---------------- ROUTES ----------------

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🔐 Register (UPDATED ROLE SUPPORT)
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required ❌"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists ❌"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user" // ✅ dynamic role
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered ✅",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Register error ❌",
      error: error.message
    });
  }
});

// 🔑 Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Login error ❌",
      error: error.message
    });
  }
});

// 🔒 Protected test
app.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route ✅",
    user: req.user
  });
});

// ---------------- PRODUCTS ----------------

// ➕ ADD PRODUCT (ONLY FARMER)
app.post(
  "/products",
  authMiddleware,
  roleMiddleware(["farmer", "admin"]), // 🔥 important
  async (req, res) => {
    try {
      const { name, price, category, image, description, stock } = req.body;

      const product = new Product({
        name,
        price,
        category,
        image,
        description,
        stock,
        farmerId: req.user.id
      });

      await product.save();

      res.status(201).json({
        message: "Product added ✅",
        product
      });

    } catch (error) {
      res.status(500).json({
        message: "Error adding product ❌",
        error: error.message
      });
    }
  }
);

// 📦 GET ALL PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("farmerId", "name email");

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching products ❌"
    });
  }
});

// 📦 GET SINGLE PRODUCT
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found ❌"
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching product ❌"
    });
  }
});

// ❌ DELETE PRODUCT (ONLY OWNER OR ADMIN)
app.delete(
  "/products/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Not found ❌" });
      }

      if (
        product.farmerId.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          message: "Not allowed ❌"
        });
      }

      await Product.findByIdAndDelete(req.params.id);

      res.json({ message: "Deleted ✅" });

    } catch (error) {
      res.status(500).json({
        message: "Error deleting ❌"
      });
    }
  }
);

// ---------------- CART ----------------

app.post("/cart", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.json({ message: "Added to cart ✅", cart });

  } catch (error) {
    res.status(500).json({
      message: "Cart error ❌"
    });
  }
});

app.get("/cart", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    res.json(cart);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching cart ❌"
    });
  }
});

// ---------------- ORDERS ----------------

app.post("/order", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart empty ❌"
      });
    }

    let totalAmount = 0;

    cart.items.forEach(item => {
      totalAmount += item.productId.price * item.quantity;
    });

    const order = new Order({
      userId: req.user.id,
      items: cart.items,
      totalAmount
    });

    await order.save();

    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed 🎉",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: "Order error ❌"
    });
  }
});

app.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId");

    res.json(orders);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders ❌"
    });
  }
});

// 👑 GET ALL USERS (ADMIN)
app.get("/admin/users", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ❌ DELETE USER
app.delete("/admin/users/:id", authMiddleware, roleMiddleware(["admin"]), async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// ---------------- SERVER ----------------
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});