const express = require("express");
const mongoose = require("mongoose");
const app = express();

const cors = require("cors");
app.use(cors());

// Parse du body
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://user1:user1@cluster0.p2jtjde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// PRODUCTS
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

module.exports = app;
