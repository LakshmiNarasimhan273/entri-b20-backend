const express = require("express");
require("dotenv").config();
const dbConnection = require("./config/dbConnection");
const productRoutes = require("./routes/ProductRoutes");
const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(express.json());
app.use("/products", productRoutes);
app.use("/auth", userRoutes);

let port = process.env.PORT || 8081;

dbConnection();
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

// config -> model -> controller -> routes -> index.js