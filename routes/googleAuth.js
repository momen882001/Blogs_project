const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const passport = require("passport");
const { createToken } = require("../methods/token_handeler");
const passportStrategy = require("./passport");

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: false,
  }),
  async (req, res) => {
    try {
      const userGoogleData = req.user._json;
      // console.log(userGoogleData);

      let user = await User.findOne({ email: userGoogleData.email });
      if (user && !user.withGoogle) {
        return res.status(400).json({ err: "There's account with this email" });
      }

      if (!user) {
        user = new User({
          name: userGoogleData.name,
          email: userGoogleData.email,
          verified: userGoogleData.email_verified,
          password: "gle",
          withGoogle: true,
        });

        await user.save();
        // res.redirect(304, process.env.FRONT_HOST + "/google-auth/" + token);
      }
      console.log(user);

      const token = createToken({ id: user._doc._id });
      res.header("auth-token", token);
      res
        .status(304)
        .redirect(
          process.env.FRONT_HOST +
            "/google-auth/" +
            token +
            "/" +
            user._doc._id +
            "/" +
            user._doc.name
        );
      // return res.status(200).send({ ...user, token });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = router;
