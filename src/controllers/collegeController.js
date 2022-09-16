const { model } = require("mongoose");
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const {isValid} = require("../validator/validation");


// here registor college in the db
const createCollege = async function (req, res) {
    try {
      // get data  from body
      let data = req.body;
      // destucture data
      let {  fullName,Name,logoLink } = data;
      
      // check there is data or not 
      if (!isValid.body(data))
        return res.status(400).send({ status: false, message: "Request body cannot be empty" });

        // check Name is valid or not and should not reserved
      if (!Name || !isValid.sortName(Name))
          return res.status(400).send({
            status: false,
            message: "Name is required in a string format length should be 3 to 10",
       });
       const checkName=await collegeModel.findOne({Name:Name})
       if(checkName) return res.status(400).send({status:false,message:"name has already ragistor"})
    
      // check full is valid or not 
      if (!fullName || !isValid.personName(fullName))
        return res.status(400).send({
          status: false,
          message: "fullName name is required in a valid format",
        });

        // check link is valid or not 
        if (!logoLink|| !isValid.link(logoLink))
        return res.status(400).send({
          status: false,
          message: "logoLink  is required in a valid format",
        });
  
       
      // resistor college
      let registor = await collegeModel.create(data)
      const output={}
       output.Name=registor.Name
       output.fullName=registor.fullName
       output.logoLink=registor.logoLink
       output.isDeleted=registor.isDeleted
      res.status(201).send({data: output});


    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };





const getCollege=async function(req,res){

  try{
  const data=req.query
  const {collegeName}=data
 
  // check data is here and in data name should be
  if(!data || !collegeName) return res.status(404).send({status:false,message:"Enter the college name in collegeName"})

  // check college name is valid
  if(!isValid.sortName(collegeName)) return res.status(400).send({status:false,message:"Enter collegeName is string form length should be 2 to 10"})
 
  //find college data with findOne and college model
  let value=await collegeModel.findOne({Name:collegeName}).select({Name:1,fullName:1,logoLink:1})
 
 // check get any data or not
 if(!value ) return res.status(404).send({status:false,message:"college not exist"})

 // when get data then find internship from itnernship db and should be specific data use select
 const interns=await internModel.find({collegeId:value._id}).select({name:1,email:1,mobile:1})
 
 // check get internsData or not
  if(interns.length==0) return res.status(404).send({status:false,message:"no internship in this college"})

  // add internsShip data and value in the result with interns key

  const { Name, fullName, logoLink } = value;  
  const result = {Name, fullName, logoLink, interns};
  

  // after successfull informesstion send data to user
  res.status(200).send({status:true,data:result})
  }
  catch(error){
    res.status(500).send({status:false,message:error.message})
  }
}
  module.exports.createCollege = createCollege;
  module.exports.getInternData = getCollege;



