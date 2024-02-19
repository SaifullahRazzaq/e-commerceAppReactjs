const { Double } = require("mongodb");
const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    title: { type: String, default: null },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, },
    stock: { type: Number, },
    brand: { type: String },
    category: { type: String, require: true },
    thumbnail: { type: String },
    images: { type: Array },
    reviewed: { type: Number },
    slug: { type: String, unique: true }
});

module.exports = mongoose.model("product", productSchema);