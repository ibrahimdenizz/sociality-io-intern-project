const router = require("express").Router();

const { scrapeProduct } = require("../utils");

router.get("/", async (req, res) => {
  try {
    return res.json({
      data: await scrapeProduct(""),
    });
  } catch (error) {
    console.log(error.message);
    if (
      error.message === "Product not found" ||
      error.message === "Only absolute URLs are supported"
    )
      return res.status(404).send({ error: "Product not found" });
    else return res.status(500).send({ error: "Please try again later" });
  }
});

module.exports = router;
