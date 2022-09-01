const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blogs");
  console.log("***Connected to database***");
}

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
