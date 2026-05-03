const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],

    totalAmount: Number,

    status: {
      type: String,
      enum:["placed","confirmed","packed","shipped","out_for_delivery","delivered"],
      default: "Placed",
    },
   deliveryAddress: {
  fullName: String,
  phone: String,
  pincode: String,
  city: String,
  state: String,
  country: String,
  addressLine: String,
}
  },
  {
    timestamps: true, // 🔥 IMPORTANT (this fixes your chart issue)
  }
);

module.exports = mongoose.model("Order", orderSchema);