const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

/// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Usuario existe" });

    const hash = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hash });
    await user.save();

    return res.status(201).json({ message: "Usuario creado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
});

/// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "No existe" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Password incorrecta" });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

module.exports = router;
