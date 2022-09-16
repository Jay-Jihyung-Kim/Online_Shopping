require("dotenv").config();
const config = require("config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const users = require("./backend/routes/userRoute");
const auth = require("./backend/routes/authRoute");
const cart = require("./backend/routes/cartRoute");

app.use(cors());
app.use(express.json());

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose.connect("mongodb://localhost:27017/shopping");
const port = process.env.PORT || 3001;

app.use("/users", users);
app.use("/auth", auth);
app.use("/cart", cart);

app.listen(port, function () {
  console.log("server running on port 3001");
});
