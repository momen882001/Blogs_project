const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const crypto = require("crypto");
const User = require("../models/User");
const verifyMail = require("../methods/mailer");
const { createToken, encryptToken } = require("../methods/token_handeler");
const expire = require("../methods/expire");

const validate = (user) => {
  const passwordValidations = {
    min: 8,
    max: 1024,
    upperCase: 1,
    numeric: 1,
    requirementCount: 4,
  };

  const Schema = Joi.object({
    password: passwordComplexity(passwordValidations),
    confirm_password: passwordComplexity(passwordValidations),
  });
  return Schema.validate(user);
};

router.post("/forget_password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "No user with this email!" });

    //check if user verified
    if (!user.verified) {
      return res.status(400).send(`Please verify your email`);
    }

    const token = createToken({ id: user._id });

    //encrypt token to send it in reset link
    const encryptedToken = encryptToken(token);

    const link = process.env.HOST + "/api/reset_password?id=" + encryptedToken;

    verifyMail(
      user.email,
      "Blogs Reset password",
      "../assets/reset.html",
      link,
      user.name
    );

    res.status(200).send("Reset Password email is sent successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/reset_password", async (req, res) => {
  try {
    const encrypted_token = req.query["id"];
    // Key to encrypt and decrypt the token
    let mykey = crypto.createDecipheriv(
      "aes-128-cbc",
      process.env.CIPHER_PASSWORD,
      process.env.INIT_VECTOR
    );

    // validate the data
    const result = validate(req.body);
    if (result.error)
      return res.status(400).json({ err: result.error.details[0].message });

    const body = result.value;

    // check if password match
    if (body.password !== body.confirm_password) {
      return res.status(400).json({ err: "Password don't match" });
    }

    let { password } = body;

    //decrypt the token
    let decrypted_token = mykey.update(encrypted_token, "hex", "utf8");
    decrypted_token += mykey.final("utf8");

    const decoded_token = jwt.verify(
      decrypted_token,
      "temporary secret for testing"
    );

    //find the user
    const user = await User.findById(decoded_token.id);
    if (!user) return res.status(404).json({ message: "User Not Found!" });

    //check the link is expired
    const tokenTime = decoded_token.iat * 1000;
    if (expire(tokenTime, 24)) {
      res
        .status(400)
        .send("The link is expired. We are sending you a new email.");

      //send another mail
      const token = createToken({ id: user._id });

      //encrypt token to send it in reset link
      const encryptedToken = encryptToken(token);

      const link =
        process.env.HOST + "/api/reset_password?id=" + encryptedToken;

      verifyMail(
        user.email,
        "Blogs Reset password",
        "../assets/reset.html",
        link,
        user.name
      );
      return;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    //change the password
    user.password = password;
    await user.save();
    res.status(200).redirect(process.env.FRONT_HOST + "/login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
