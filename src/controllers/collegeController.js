const collegeModel = require("../models/collegeModel")
const { isValidBody,isValidName,} = require("../validator/validation");



const createCollege = async function (req, res) {
    try {
      let data = req.body;
      let {  fullName,  } = data;
  
      if (!isValidBody(data))
        return res
          .status(400)
          .send({ status: false, msg: "Request body cannot be empty" });
  
      if (!fullName || !isValidName(fullName))
        return res.status(400).send({
          status: false,
          msg: "fullName name is required in a valid format",
        });
  
       

      let alldata = await collegeModel.create(data)
      res.status(201).send({
        status: true,
        msg:"college created succesfully",
        data: alldata,
      });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };



  module.exports.createCollege = createCollege;



