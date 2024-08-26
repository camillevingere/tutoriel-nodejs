const express = require("express");
const productCtrl = require("../controllers/products");
const router = express.Router();

router.get("/", productCtrl.getProducts);

router.get("/:id", productCtrl.getOneProduct);

router.post("/", productCtrl.createProduct);

router.put("/:id", productCtrl.updateProduct);

router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
