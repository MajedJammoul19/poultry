const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  product: String,
  type: String,
  weight: String,
  pricePerKg: Number,
  minOrder: Number,
  date: String,
  available: Boolean
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);