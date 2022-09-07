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

//get all blogs
router.get("/blog", async (req, res) => {
  try {
    const [filterName] = Object.keys(req.query);
    let filter = !filterName ? {} : { authorId: req.query[filterName] };
    const blogs = await Blog.find(filter);
    res.status(200).send(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all blogs of a user
router.get("/blog/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ err: "Not Found!" });
    res.status(200).send(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create blog
router.post("/blog", auth, async (req, res) => {
  try {
    const result = validate(req.body);
    if (result.error)
      return res.status(400).json({ err: result.error.details[0].message });

    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ err: "Access Denied!" });

    const blog = { author: user.name, authorId: user.id, ...result.value };

    const new_blog = new Blog(blog);
    await new_blog.save();

    res.status(201).json({ message: "Blog created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update one blog
router.put("/blog/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = validate(req.body);
    if (result.error)
      return res.status(400).json({ err: result.error.details[0].message });
    const updates = result.value;

    const userId = req.user.id;

    const blog = await Blog.findOneAndUpdate(
      { _id: id, authorId: userId },
      updates
    );
    if (!blog) return res.status(404).json({ err: "Not Found!" });

    res.status(200).json({ message: "Blog updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete one blog
router.delete("/blog/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const blog = await Blog.findOneAndDelete({ _id: id, authorId: userId });
    if (!blog) return res.status(404).json({ err: "Not Found!" });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//delete all user's blogs
router.delete("/blog", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const blog = await Blog.deleteMany({ authorId: userId });
    if (!blog) return res.status(404).json({ err: "Not Found!" });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
