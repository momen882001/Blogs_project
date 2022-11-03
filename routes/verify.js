const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const verifyMail = require("../methods/mailer");
const { createToken, encryptToken } = require("../methods/token_handeler");
const crypto = require("crypto");
const expire = require("../methods/expire");

router.get("/verify", async (req, res) => {
  const encrypted_token = req.query["id"];
  // Key to encrypt and decrypt the token
  let mykey = crypto.createDecipheriv(
    "aes-128-cbc",
    process.env.CIPHER_PASSWORD,
    process.env.INIT_VECTOR
  );

  try {
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

    //check if user verified
    if (user.verified) {
      return res.status(200).send(`${user.name} is aleready verified`);
    }

    //check the link is expired
    const tokenTime = decoded_token.iat * 1000;
    if (expire(tokenTime, 2)) {
      res
        .status(400)
        .send("The link is expired. We are sending you a new email.");

      //send another mail
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
      return;
    }

    //verify the user
    user.verified = true;
    await user.save();
    res.status(200).redirect(process.env.FRONT_HOST + "/login");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
