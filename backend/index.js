const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const productRouter = require("./routers/product");

const DB_URI = process.env.DB_URI || "mongodb://localhost/internProject";

mongoose
  .connect(DB_URI, {
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
