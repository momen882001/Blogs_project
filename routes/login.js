const router = require("express").Router();
const { compare } = require("bcrypt");
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const user = req.body;
  const exist = await User.findOne({ email: user.email });

  if (!exist) return res.status(400).json({ err: "Invalid email or password" });

  const validPass = await bcrypt.compare(user.password, exist.password);

  if (!validPass) {
    return res.status(400).json({ err: "Invalid email or password" });
  }
});

module.exports = router;
