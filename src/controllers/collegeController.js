const { model } = require("mongoose");
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const { isValidBody,isValidName,isValidLink} = require("../validator/validation");



const createCollege = async function (req, res) {
    try {
      let data = req.body;
      let {  fullName,Name,logoLink, } = data;
  
      if (!isValidBody(data))
        return res
          .status(400)
          .send({ status: false, message: "Request body cannot be empty" });

      if (!Name || !isValidName(Name))
          return res.status(400).send({
            status: false,
            message: "Name is required in a valid format",
       });
    
  
      if (!fullName || !isValidName(fullName))
        return res.status(400).send({
          status: false,
          message: "fullName name is required in a valid format",
        });
        if (!logoLink|| !isValidLink(logoLink))
        return res.status(400).send({
          status: false,
          message: "logoLink  is required in a valid format",
        });
  
       

      let alldata = await collegeModel.create(data)
      res.status(201).send({
        status: true,
        message:"college created succesfully",
        data: alldata,
      });
    } catch (error) {
      res.status(500).send({ status: false, message: error.message });
    }
  };




//   //### GET /functionup/collegeDetails
// - Returns the college details for the requested college (Expect a query parameter by the name `collegeName`. This is anabbreviated college name. For example `iith`)
// - Returns the list of all interns who have applied for internship at this college.
// - The response structure should look like [this](#college-details)


const getCollege=async function(req,res){

  try{
  const data=req.query
  const {name}=data
 
  // check data is here and in data name should be
  if(!data || !name) return res.status(404).send({status:false,message:"Enter the college name in name"})
 
  //find college data with findOne and college model
  let value=await collegeModel.findOne({Name:name}).select({Name:1,fullName:1,logoLink:1})
 
 // check get any data or not
 if(!value ) return res.status(404).send({status:false,message:"college not exist"})

 // when get data then find internship from itnernship db and should be specific data use select
 const internsData=await internModel.find({collegeId:value._id}).select({name:1,email:1,mobile:1})
 
 // check get internsData or not
  if(internsData.length==0) return res.status(404).send({status:false,message:"no internship in this college"})

  // add internsShip data and value in the result with interns key

  const { Name, fullName, logoLink } = value;  
  const result = {Name, fullName, logoLink, internsData};
  

  // after successfull informesstion send data to user
  res.status(200).send({status:true,data:result})
  }
  catch(error){
    res.status(500).send({status:false,message:error.message})
  }
}
  module.exports.createCollege = createCollege;
  module.exports.getInternData = getCollege;



