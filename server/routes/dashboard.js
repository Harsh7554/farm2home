const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// GET Farmer Dashboard
router.get("/", auth, async (req, res) => {
  try {
    const farmerId = req.user.id;

    // total products
    const totalProducts = await Product.countDocuments({ farmerId });

    // orders
    const orders = await Order.find({ farmerId }).populate("items.productId");

    const totalOrders = orders.length;

    // earnings
    const totalEarnings = orders.reduce((sum, order) => {
      const orderTotal = order.items.reduce((s, item) => {
        return s + item.productId.price * item.quantity;
      }, 0);

      return sum + orderTotal;
    }, 0);

    res.json({
      totalProducts,
      totalOrders,
      totalEarnings,
      orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;