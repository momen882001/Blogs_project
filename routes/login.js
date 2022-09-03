const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const createToken = (payload) => {
  const token = jwt.sign(payload, "temporary secret for testing");
  return token;
};

router.post("/login", async (req, res) => {
  let user = req.body;
  const exist = await User.findOne({ email: user.email });

  if (!exist) return res.status(400).json({ err: "Invalid email or password" });

  const validPass = await bcrypt.compare(user.password, exist.password);

  if (!validPass) {
    return res.status(400).json({ err: "Invalid email or password" });
  }
  user = exist._doc;

  const token = createToken({ id: user.id });
  res.header("auth-token", token);

  res
    .status(200)
    .send({ ..._.pick(user, ["name", "email", "birthdate"]), token });
});

module.exports = router;
