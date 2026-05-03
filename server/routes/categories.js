const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// 🔥 GET ALL
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// 🔥 ADD
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = new Category({ name });
    await newCategory.save();

    res.json(newCategory);
  } catch (err) {
    res.status(500).json({ message: "Failed to add category" });
  }
});

// 🔥 DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;