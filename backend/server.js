const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/foodbot");

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Servidor en puerto 3000");
});