const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    eamil: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const blogSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "Uer",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema);
