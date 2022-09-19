const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const { isValid } = require("../validator/validation");

exports.createIntern = async function (req, res) {
  try {
    //get data from the body
    let bodyData = req.body;

    // For Empty Body
    if (Object.keys(bodyData).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "please enter data" });

    // validating for name(Madatory)
    if (!bodyData.name.trim()) {
      return res
        .status(400)
        .send({ status: false, message: "provide name , it's mandatory" });
    }
    // validation for name(Not Allowed Special Character and Number)
    if (!isValid.personName(bodyData.name)) {
      return res
        .status(400)
        .send({ status: false, message: " name contains only string form" });
    }

    // validating for email(Madatory)
    if (!bodyData.email) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide email" });
    }
    // validating for name(Should be in Correct formate)
    if (!isValid.email(bodyData.email)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid email" });
    }

    //Checking Dublication(Email)
    let checkEmail = await internModel.findOne({ email: bodyData.email });
    if (checkEmail) {
      return res
        .status(409)
        .send({ status: false, message: "this email is already reserved" });
    }

    //validating for Mobile(madatory)
    if (!bodyData.mobile) {
      return res
        .status(400)
        .send({ status: false, message: "mobile is required" });
    }

    //validating for Mobile(Correct Formate or not)
    if (!isValid.mobile(bodyData.mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid mobile" });
    }
    // Checking Dublication(Number)
    let checkMobile = await internModel.findOne({ mobile: bodyData.mobile });
    if (checkMobile) {
      return res.status(409).send({
        status: false,
        message: "this mobile number is already reserved",
      });
    }

    //validating for collegeName(Madatory)
    if (!bodyData.collegeName) {
      return res
        .status(400)
        .send({ status: true, message: "Please provide collegeName" });
    }

    if (!isValid.sortName(bodyData.collegeName)) {
      return res.status(400).send({
        status: false,
        messege: "collegeName is not valid,please enter valid collegeName",
      });
    }

    // Checking College(Present/Not)
    let findCollegeId = await collegeModel.findOne({
      name: bodyData.collegeName,
    });

    if (!findCollegeId) {
      return res
        .status(400)
        .send({ status: false, messege: "college is not exist" });
    }

    //Creating college Object key inside of bodyData
    bodyData.collegeId = findCollegeId._id;

    //
    let internData = await internModel.create(bodyData);

    return res.status(201).send({ status: true, data: internData });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
