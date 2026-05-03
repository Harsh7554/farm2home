const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// 🔐 Middlewares
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
const user = require("../models/user");


// =======================
// ✅ REGISTER
// =======================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const User = require("../models/user");

    // check user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // hash password
    const bcrypt = require("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.json({ message: "User registered successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});


// =======================
// ✅ LOGIN
// =======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }
    
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    // 🔥 create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error ❌" });
  }
});


// =======================
// 👥 GET ALL USERS (ADMIN ONLY)
// =======================
router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users ❌" });
    }
  }
);


// =======================
// 🔄 UPDATE USER ROLE (ADMIN ONLY)
// =======================
router.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const { role } = req.body;

      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found ❌" });
      }

      // ❌ prevent changing own role (optional safety)
      if (req.user.id === user._id.toString()) {
        return res.status(400).json({
          message: "You cannot change your own role ❌",
        });
      }

      user.role = role;
      await user.save();

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Error updating role ❌" });
    }
  }
);


// =======================
// ❌ DELETE USER (ADMIN ONLY)
// =======================
router.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found ❌" });
      }

      // ❌ prevent deleting admin
      if (user.role === "admin") {
        return res.status(400).json({
          message: "Cannot delete admin ❌",
        });
      }

      await user.deleteOne();

      res.json({ message: "User deleted ✅" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user ❌" });
    }
  }
);


// =======================
module.exports = router;