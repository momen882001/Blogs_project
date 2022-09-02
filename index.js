const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 4000;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://ahmedraouf2:test1234@cluster0.e5zey.mongodb.net/blogs?retryWrites=true&w=majority"
  );
  console.log("***Connected to database***");
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
