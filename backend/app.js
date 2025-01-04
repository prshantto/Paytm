const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/user.routes");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("server running...");
});

module.exports = app;
