const express = require("express");
//const express=require("body-parser")
const { default: mongoose } = require("mongoose");

const route = require("./routes/route.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect(
    "mongodb+srv://KhomeshUser-456:fttFkNqqiYu79Rgv@cluster0.aybauye.mongodb.net/groupXDatabase",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
