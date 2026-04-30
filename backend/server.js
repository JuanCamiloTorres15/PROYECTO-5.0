const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/foodbot";

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado");

    app.listen(PORT, () => {
      console.log(`Servidor en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error iniciando el servidor:", error.message);
    process.exit(1);
  }
}

startServer();
