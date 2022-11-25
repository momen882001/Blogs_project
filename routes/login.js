const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");
const { createToken } = require("../methods/token_handeler");

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

  if (exist.withGoogle) {
    return res.status(400).json({ err: "Invalid email or password" });
  }

  const validPass = await bcrypt.compare(user.password, exist.password);

  if (!validPass) {
    return res.status(400).json({ err: "Invalid email or password" });
  }
  user = exist._doc;

  if (!user.verified) {
    return res.status(400).json({ err: "Please verify your email" });
  }

  const token = createToken({ id: user._id });
  res.header("auth-token", token);

  res.status(200).send({ ...user, token });
});

module.exports = router;
