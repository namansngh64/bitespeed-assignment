require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { handleError } = require("./app/config/error.js");
const { connectDb } = require("./app/config/db.js");

const { PORT } = process.env;

const app = express();

connectDb();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const port = PORT || 8080;

app.use("/", require("./app/routes/index"));

app.use(handleError);
require("./app/config/uncaughtError");

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
