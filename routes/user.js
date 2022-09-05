const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

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
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).email().required(),
    password: passwordComplexity(passwordValidations).required(),
    confirm_password: passwordComplexity(passwordValidations).required(),
    birthdate: Joi.date().required(),
  });
  return Schema.validate(user);
};

router.delete("/user", (req, res) => {
  User.deleteMany({}, (err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});

router.post("/user", async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);

    const user = result.value;

    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).json({ err: "There's account with this email" });
    }

    if (user.password !== user.confirm_password) {
      return res.status(400).json({ err: "Password don't match" });
    }

    const newUser = new User(user);

    //hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    const token = createToken({ id: user._id });
    res.header("auth-token", token);

    res
      .status(201)
      .send({ ..._.pick(newUser, ["name", "email", "birthdate"]), token });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
