const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const createToken = (payload) => {
  const token = jwt.sign(payload, "temporary secret for testing");
  return token;
};

const validate = (user) => {
  const passwordValidations = {
    min: 8,
    max: 1024,
    upperCase: 1,
    numeric: 1,
    requirementCount: 4,
  };

  const Schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: passwordComplexity(passwordValidations).required(),
  });
  return Schema.validate(user);
};

router.post("/login", async (req, res) => {
  const result = validate(req.body);
  if (result.error)
    return res.status(400).json({ err: result.error.details[0].message });

  let user = result.value;
  const exist = await User.findOne({ email: user.email });

  if (!exist) return res.status(400).json({ err: "Invalid email or password" });

  const validPass = await bcrypt.compare(user.password, exist.password);

  if (!validPass) {
    return res.status(400).json({ err: "Invalid email or password" });
  }
  user = exist._doc;

  const token = createToken({ id: user._id });
  res.header("auth-token", token);

  res
    .status(200)
    .send({ ..._.pick(user, ["_id", "name", "email", "birthdate"]), token });
});

module.exports = router;
