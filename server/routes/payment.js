const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const razorpay = require("../config/razorpay");
const authMiddleware = require("../middleware/auth");

const Cart = require("../models/Cart");
const Order = require("../models/Order"); // make sure you have this model

// ===============================
// 🔥 CREATE ORDER
// ===============================
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;

    // ✅ Validate address
    if (!address || !address.addressLine || !address.city) {
      return res.status(400).json({ error: "Address is required" });
    }

    let cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // ✅ Calculate total
    const total = cart.items.reduce((sum, item) => {
      const price = Number(item.productId?.price || 0);
      return sum + price * item.quantity;
    }, 0);

    const options = {
      amount: Math.round(total * 100),
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
      amount: options.amount,
    });

  } catch (err) {
    console.log("CREATE ORDER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// ===============================
// 🔥 VERIFY PAYMENT
// ===============================
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
    } = req.body;

    // generate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // verify
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }

    // get user cart
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart empty" });
    }

    // calculate total again (important for security)
    const total = cart.items.reduce((sum, item) => {
      const price = Number(item.productId?.price || 0);
      return sum + price * item.quantity;
    }, 0);

    // save order with arrdress
    const newOrder = await Order.create({
      user: req.user.id,
      items: cart.items,
      total,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: "paid",
      deliveryAddress:address,
    });

    // clear cart
    cart.items = [];
    await cart.save();

    return res.json({
      success: true,
      message: "Payment verified & order placed",
      order: newOrder,
    });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;