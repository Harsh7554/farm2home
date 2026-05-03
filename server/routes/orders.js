const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const authMiddleware = require("../middleware/auth");


// =============================
// ✅ PLACE ORDER
// =============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty ❌" });
    }

    // ✅ FIXED TOTAL CALCULATION
    let total = 0;

    cart.items.forEach((item) => {
      total += item.productId.price * item.quantity;
    });

    // ✅ CREATE ORDER
    const order = new Order({
      userId: userId,
      items: cart.items.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      totalAmount: total,
      status: "placed"
    });

    await order.save();

    // ✅ CLEAR CART
    cart.items = [];
    await cart.save();

    res.json({
      message: "Order placed successfully ✅",
      order
    });

  } catch (err) {
    console.log("ORDER ERROR:", err);
    res.status(500).json({ message: "Error placing order ❌" });
  }
});


// =============================
// ✅ USER ORDERS
// =============================
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.log("FETCH MY ORDERS ERROR:", err);
    res.status(500).json({ message: "Error fetching orders ❌" });
  }
});


// =============================
// ✅ ADMIN: ALL ORDERS
// =============================
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    console.log("ADMIN ORDERS ERROR:", err);
    res.status(500).json({ message: "Error ❌" });
  }
});


// =============================
// ✅ UPDATE ORDER STATUS
// =============================
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: "Error updating ❌" });
  }
});


module.exports = router;