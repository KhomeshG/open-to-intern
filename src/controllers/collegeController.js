const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const { isValid } = require("../validator/validation");

// here registor college in the db
exports.createCollege = async function (req, res) {
  try {
    //Cant Accept Empty
    let bodyData = req.body;
    if (Object.keys(bodyData).length == 0)
      return res
        .status(400)
        .send({ status: false, message: "please enter data" });

    // validation for name(madatory)
    if (!req.body.name || !isValid.sortName(req.body.name))
      return res.status(400).send({
        status: false,
        message: "name is required in a string format length should be 2 to 10",
      });
    //Duplication (Not Allowed)
    const checkName = await collegeModel.findOne({ name: req.body.name });
    if (checkName)
      return res
        .status(400)
        .send({ status: false, message: "name has already register" });

    // validation for name formate(Not Accept Special Character And Number in name)
    if (!req.body.fullName.trim() || !isValid.personName(req.body.fullName))
      return res.status(400).send({
        status: false,
        message: "fullName name is required in a valid format",
      });

    // validation for Link(madatory)||
    if (!req.body.logoLink || !isValid.link(req.body.logoLink))
      return res.status(400).send({
        status: false,
        message: "logoLink  is required in a valid format",
      });
    // register Colleges(If All is Fine)
    else {
      let collegeData = await collegeModel.create(req.body);

      return res.status(201).send({ status: true, data: collegeData });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

//Get CollegeIntern Data

exports.collegeDetails = async function (req, res) {
  try {
    let checkCollege = await collegeModel.findOne({
      name: req.query.collegeName,
    });

    if (checkCollege == null) {
      return res.status(400).send({ status: false, msg: " College Not Found" });
    }

    //Destucturing
    const { name, fullName, logoLink } = checkCollege;

    //Finding intern Who apply For this Collges
    let interns = await internModel
      .find({ collegeId: checkCollege._id })
      .select({ name: 1, email: 1, mobile: 1 });

    if (!interns) {
      return res.status(400).send({ status: false, msg: " Intern Not Found" });
    }

    //stucturing
    let resultData = { name, fullName, logoLink, interns };
    //else {
    return res.status(200).send({
      status: true,
      data: resultData,
    });
    //}
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, msg: "Server Error", errMsg: err.message });
  }
};
