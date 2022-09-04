const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const auth = require("../middelwares/auth");
const Joi = require("joi");

const validate = (user) => {
  const Schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    body: Joi.string().trim().required(),
    category: Joi.string().min(2).max(100).required(),
  });
  return Schema.validate(user);
};

router.post("/blog", auth, async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).send("Access Denied!");

    const blog = { author: user.name, ...result.value };

    const new_blog = new Blog(blog);
    await new_blog.save();

    res.status(201).json({ message: "Blog created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
