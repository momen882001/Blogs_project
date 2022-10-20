const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const passport = require("passport");
const passportStrategy = require("./passport");

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
  })
);

module.exports = router;
