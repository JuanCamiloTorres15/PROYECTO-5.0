const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Usuario demo
const USER = {
  email: "admin@test.com",
  password: "123456"
};

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    return res.json({
      success: true,
      user: { email }
    });
  }

  res.status(401).json({
    success: false,
    message: "Credenciales incorrectas"
  });
});

// CHATBOT
app.post("/chat", (req, res) => {
  const { message } = req.body;

  let response = "No entendí tu pedido";

  if (message.includes("pizza")) response = "Pizza 🍕 desde $20.000";
  else if (message.includes("hamburguesa")) response = "Hamburguesa 🍔 desde $12.000";
  else if (message.includes("menu")) response = "Menú: pizza, hamburguesa";
  else if (message.includes("hola")) response = "Hola 👋";

  res.json({ response });
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
