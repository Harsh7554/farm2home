const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const role = require("../middleware/role");


// ✅ GET ALL (for public)
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


// ✅ ADD PRODUCT (FARMER ONLY)
router.post("/", auth, role("farmer"), async (req, res) => {
  try {
    const { name, price, category, image } = req.body;

    const product = new Product({
      name,
      price,
      category,
      image,
      farmerId: req.user.id,
    });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error adding product" });
  }
});


// ✅ DELETE (ONLY OWN PRODUCT)
router.delete("/:id", auth, role("farmer"), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      farmerId: req.user.id,
    });

    if (!product) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete error" });
  }
});


// ✅ UPDATE (ONLY OWN PRODUCT)
router.put("/:id", auth, role("farmer"), async (req, res) => {
  try {
    const { name, price, category, image } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, farmerId: req.user.id },
      { name, price, category, image },
      { new: true }
    );

    if (!product) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Update error" });
  }
});


// ✅ GET ONLY LOGGED-IN FARMER PRODUCTS
router.get("/my", auth, role("farmer"), async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

module.exports = router;