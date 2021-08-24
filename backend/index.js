const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const productRouter = require("./routers/product");

const DB_URI = process.env.DB_URI || "mongodb://localhost";

mongoose
  .connect(DB_URI + "/internProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect DB");
  });

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

app.use("/api/product", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve("dist")));

  app.get("*", (req, res) => {
    return res.sendFile(path.resolve("dist", "index.html"));
  });
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
