const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internCont = require("../controllers/internController");

//Testing All Working fine or not
router.get("/demo/:name", function (req, res) {
  const a = req.params.name;
  console.log(a);
  res.send("done");
});

//Create College API
router.post("/functionup/colleges", collegeController.createCollege);

//Create intern API
router.post("/functionup/interns", internCont.createIntern);

//Get collegeDetails API
router.get("/functionup/collegeDetails", collegeController.collegeDetails);

//For Wrong URl
router.all("/**", function (req, res) {
  res.status(400).send({
    status: false,
    msg: "Wrong Url",
  });
});

module.exports = router;
