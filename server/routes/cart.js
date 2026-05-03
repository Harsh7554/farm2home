const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth");


// ================= ADD TO CART =================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found ❌" });
    }

    // ✅ FIX: always use userId
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: new mongoose.Types.ObjectId(productId), // ✅ FIX
        quantity,
      });
    }

    await cart.save();

    res.json({ message: "Added to cart ✅", cart });

  } catch (err) {
    console.log("ADD CART ERROR:", err);
    res.status(500).json({ message: "Server error ❌" });
  }
});


// ================= GET CART =================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    console.log("CART FROM DB:", cart);

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json({ items: cart.items });

  } catch (err) {
    console.log("GET CART ERROR:", err);
    res.status(500).json({ message: "Error fetching cart ❌" });
  }
});


// ================= UPDATE QUANTITY =================
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id }); // ✅ FIX

    if (!cart) {
      return res.status(404).json({ message: "Cart not found ❌" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    res.json({ items: cart.items });

  } catch (err) {
    console.log("UPDATE CART ERROR:", err);
    res.status(500).json({ message: "Error updating cart ❌" });
  }
});


// ================= REMOVE ITEM =================
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }); // ✅ FIX

    if (!cart) {
      return res.status(404).json({ message: "Cart not found ❌" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );

    await cart.save();

    res.json({ items: cart.items });

  } catch (err) {
    console.log("REMOVE ITEM ERROR:", err);
    res.status(500).json({ message: "Error removing item ❌" });
  }
});


module.exports = router;