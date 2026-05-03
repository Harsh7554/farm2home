const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/Product");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

// 🔥 REAL DASHBOARD API
router.get("/dashboard", auth, async (req, res) => {
  try {
    // ✅ ONLY ADMIN ACCESS
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    // 🔢 COUNTS
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    // 💰 TOTAL REVENUE
    const revenueData = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const revenue = revenueData[0]?.total || 0;

    // 📊 MONTHLY ANALYTICS (REAL)
    const monthlyData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const chartData = monthlyData.map((item) => ({
      name: months[item._id - 1],
      revenue: item.revenue,
    }));

    res.json({
      stats: { users, products, orders, revenue },
      chartData,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;