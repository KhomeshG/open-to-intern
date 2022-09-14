const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const mongoose = require('mongoose');


const createIntern = async function (req, res) {
    try {
        let requestbody = req.body
        let alphabets = /^[A-Z a-z 0-9]{8,30}$/
        let mobileValid =  /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/   
        if (!requestbody.name) {
            return res.status(400).send({ status: false, msg: "provide name , it's mandatory" })
        }
        if (!alphabets.test(requestbody.name)) {
            return res.status(400).send({ status: false, msg: " name contains only string form" })
        }
        let checkname = await internModel.findOne({ name: requestbody.name })
        if (checkname) {
            return res.status(400).send({ status: false, msg: "this name is already reserved" })
        }
        if (!requestbody.email) {
            return res.status(400).send({ status: false, msg: "Please provide email" })
        }
        if (!emailValid.test(requestbody.email)) {
            return res.status(400).send({ status: false, msg: "Enter valid email" })
        }
        let checkEmail = await internModel.findOne({ eamil: requestbody.email })
        if (checkEmail) {
            return res.status(400).send({ status: false, msg: "this email is already reserved" })}
        if (!requestbody.mobile) {
            return res.status(400).send({ status: false, msg: "Please provide mobile no" })
        }
        if (!mobileValid.test(requestbody.mobile)) {
            return res.status(400).send({ status: false, msg: "Enter valid mobile" })
        }
        
        if (!requestbody.collegeId) {
            return res.status(400).send({ status: true , msg: "Please provide college id" })
        }
        if (!mongoose.Types.ObjectId.isValid(requestbody.collegeId)) {
            return res.status(400).send({ status: false, msg: "collegeId is not valid,please enter valid ID" })
        }
           console.log(requestbody.collegeId)
        let collegebyid = await collegeModel.findById({_id:requestbody.collegeId})
        if (!collegebyid) {
            return res.status(400).send({ status: false, msg: "college is not exist" })
        }
// -------------------------------------------------------------------------------------
        

        let internCreated = await internModel.create(requestbody)
        res.status(201).send({ data:internCreated })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.createIntern = createIntern