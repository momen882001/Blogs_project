const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// const dotenv = require("dotenv");
require("dotenv").config();
const passport = require("passport");
const passportStrategy = require("./routes/passport");

const app = express();

const PORT = 4000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    // "mongodb://127.0.0.1:27017/blogs"
    "mongodb+srv://ahmedraouf2:test1234@cluster0.e5zey.mongodb.net/blogs?retryWrites=true&w=majority"
  );
  console.log("***Connected to database***");
}

app.use(cors());

app.use(passport.initialize());
// app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/googleAuth"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/login"));
app.use("/api", require("./routes/blog"));
app.use("/api", require("./routes/verify"));
app.use("/api", require("./routes/forgetPass"));

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
