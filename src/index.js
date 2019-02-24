require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/", routes);
app.use("/files", express.static(path.resolve(__dirname, "../tmp/uploads")));

app.listen(3000, () => {
  console.log("Express running on port 3000");
});
