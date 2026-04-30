const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const SECRET = "secret123";

/// REGISTER
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("Usuario existe");

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hash });
  await user.save();

  res.send("Usuario creado");
});

/// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("No existe");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).send("Password incorrecta");

  const token = jwt.sign({ id: user._id }, SECRET);

  res.json({ token });
});

module.exports = router;