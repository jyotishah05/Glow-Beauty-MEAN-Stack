const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Makeup', 'Skincare', 'Hair Care', 'Body Care & Fragrances']
    },
    features: [{ type: String }],
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    stock: { type: Number, default: 50, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
