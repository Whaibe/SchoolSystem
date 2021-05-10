const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    username: Number,
    concept: String,
    value: Number,
    date: Date,
    status: String,
    id: Number,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = {
  Payment,
};
