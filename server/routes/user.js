const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");

// ✅ UPDATE PROFILE
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, image } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.image = image;

    await user.save();

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;