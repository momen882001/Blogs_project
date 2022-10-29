const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyMail = require("../methods/mailer");
const { createToken, encryptToken } = require("../methods/token_handeler");
const crypto = require("crypto");
const expire = require("../methods/expire");

router.put("/forgetPass", (req, res) => {
  const { email } = req.body;
  const user = User.findOne({ email });

  const token = createToken({ id: user._id });

  //encrypt token to send it in verify link
  const encryptedToken = encryptToken(token);

  const link = process.env.HOST + "/api/verify?id=" + encryptedToken;

  verifyMail(
    user.email,
    "Blogs verify mail",
    "../assets/verify.html",
    link,
    user.name
  );
});

module.exports = router;
