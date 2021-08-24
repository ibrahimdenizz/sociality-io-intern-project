const router = require("express").Router();
const mongoose = require("mongoose");

const Product = require("../models/product");
const { scrapeProduct } = require("../utils");

router.post("/add", async (req, res) => {
  try {
    const scrapedProductData = await scrapeProduct(req.body.url);
    const product = new Product(scrapedProductData);
    const { _id, name, img, price } = await product.save();
    return res.status(200).send({
      message: "The product is successfully added.",
      data: {
        _id,
        name,
        img,
        price,
      },
    });
  } catch (error) {
    console.log(error.message);
    if (
      error.message === "The product is not found" ||
      error.message === "Only absolute URLs are supported"
    )
      return res.status(404).send({ error: "The product not found" });
    else return res.status(500).send({ error: "Please try again later" });
  }
});

router.get("/", async (req, res) => {
  const { id } = req.query;

  if (id) {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send({ error: "The product not found" });

    const product = await Product.findById(id).select("-__v");

    if (!product)
      return res.status(404).send({ error: "The product not found" });

    return res.status(200).send({ data: product });
  } else {
    const products = await Product.find().select("-__v");

    return res.status(200).send({ data: products || [] });
  }
});

module.exports = router;
