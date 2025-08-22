const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    makingCompany: {
        type: String,
        required: true,
    },
    colors: {
        type: String,
        enum: ["White", "Metalic Grey", "Metalic Black"]
    }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;