const Product = require("../model/ProductModel");

// CRUD Functions
const createProduct = async (req, res) => {
    const { title, price, description, makingCompany, colors } = req.body;
    try {
        if (!title || !price || !description || !makingCompany) {
            return res.status(400).json({ message: "Title, Price, Description and Making Company informations are mandatory" });
        }
        const newProduct = new Product({ title, price, description, makingCompany, colors });
        await newProduct.save();
        res.status(201).json({ message: "Product addedd" });
    } catch (err) {
        res.status(500).json({ message: "Server Error: Network Connection failed" });
    }
}

// GET ALL RECORDS
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Server Error: Network Connection failed" });
    }
}

// Update Product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: "Product updated", updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Server Error: Network Connection failed" });
    }
}

// Delete Product
const deleteProduct = async (req, res) => {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Product deleted"});
    } catch (err) {
        res.status(500).json({ message: "Server Error: Network Connection failed" });
    }
}

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };