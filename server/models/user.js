const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["user", "farmer", "admin"],
    default: "user",
  },
 image: {
  type: String,
  default: "https://i.pravatar.cc/150"
},


address: {
  fullName: String,
  phone: String,
  pincode: String,
  city: String,
  state: String,
  country: String,
  addressLine: String,
}
});

module.exports = mongoose.model("User", userSchema);