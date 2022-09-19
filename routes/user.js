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

const validateUpdate = (user) => {
  const passwordValidations = {
    min: 8,
    max: 1024,
    upperCase: 1,
    numeric: 1,
    requirementCount: 4,
  };

  const Schema = Joi.object({
    name: Joi.string().min(2).max(50),
    email: Joi.string().min(5).max(255).email(),
    password: passwordComplexity(passwordValidations),
    confirm_password: passwordComplexity(passwordValidations),
    birthdate: Joi.date(),
  });
  return Schema.validate(user);
};

router.get("/user", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    console.log(user);
    if (!user) return res.status(404).json({ err: "User Not Found!" });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/user", async (req, res) => {
  try {
    // validate the data
    const result = validate(req.body);
    if (result.error)
      return res.status(400).json({ err: result.error.details[0].message });

    const user = result.value;

    // check if user exist
    const exist = await User.findOne({ email: req.body.email });
    if (exist) {
      return res.status(400).json({ err: "There's account with this email" });
    }

    // check if passowrd match
    if (user.password !== user.confirm_password) {
      return res.status(400).json({ err: "Password don't match" });
    }

    const newUser = new User(user);

    //hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    const token = createToken({ id: newUser._doc._id });
    res.header("auth-token", token);

    res.status(201).send({
      ...newUser._doc,
      token,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // validate the data
    const result = validateUpdate(req.body);
    if (result.error)
      return res.status(400).json({ err: result.error.details[0].message });

    const update = result.value;
    // console.log(update);

    const user = await User.findByIdAndUpdate(userId, update);
    console.log(user);
    if (!user) return res.status(404).json({ err: "User Not Found!" });

    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ err: "User Not Found!" });
    res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/user", (req, res) => {
  try {
    User.deleteMany({}, (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
