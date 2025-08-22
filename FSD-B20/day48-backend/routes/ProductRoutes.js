const express = require("express");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controller/ProductController");

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;