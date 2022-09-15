const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const mongoose = require('mongoose');
const { isValid } = require("../validator/validation");


const createIntern = async function (req, res) {
    try {
        //get data from the body
        let requestbody = req.body

        // check there is any data of not
        if (Object.keys(requestbody).length == 0) return res.status(404).send({ status: false, message: "please enter data" })

        // check there is any name in data if yes check should be valid 
        if (!requestbody.name) {
            return res.status(400).send({ status: false, message: "provide name , it's mandatory" })
        }
        if (!isValid.personName(requestbody.name)) {
            return res.status(400).send({ status: false, message: " name contains only string form" })
        }
    
        // check there is any email in data if yes check should be valid and not reserved
        if (!requestbody.email) {
            return res.status(400).send({ status: false, message: "Please provide email" })
        }
        if (!isValid.email(requestbody.email)) {
            return res.status(400).send({ status: false, message: "Enter valid email" })
        }
        let checkEmail = await internModel.findOne({ email: requestbody.email })
        if (checkEmail) {
            return res.status(400).send({ status: false, message: "this email is already reserved" })
        }

        // check there is any mobile in data if yes check should be valid and not reserved
        if (!requestbody.mobile) {
            return res.status(400).send({ status: false, message: "Please provide mobile no" })
        }
        if (!isValid.mobile(requestbody.mobile)) {
            return res.status(400).send({ status: false, message: "Enter valid mobile" })
        }
        let checkMobile = await internModel.findOne({ mobile: requestbody.mobile })
        if (checkMobile) {
            return res.status(400).send({ status: false, message: "this mobile number is already reserved" })
        }

        // check there is any collegeId in requestedbody if yes shoud be valid
        if (!requestbody.collegeId) {
            return res.status(400).send({ status: true, message: "Please provide college id" })
        }
        if (!mongoose.Types.ObjectId.isValid(requestbody.collegeId)) {
            return res.status(400).send({ status: false, messege: "collegeId is not valid,please enter valid ID" })
        }
        let collegebyid = await collegeModel.findById({ _id: requestbody.collegeId })
        if (!collegebyid) {
            return res.status(400).send({ status: false, messege: "college is not exist" })
        }

        // now resistor form
        let internCreated = await internModel.create(requestbody)
        res.status(201).send({ data: internCreated })
    }
    catch (err) {
        res.status(500).send(err.message)
    }
}

module.exports.createIntern = createIntern