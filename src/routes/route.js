const express=require("express")
const router=express.Router()
const collegeCont = require("../controllers/collegeController")


router.get("/demo/:name",function(req,res){
    const a=req.params.name
    console.log(a)
    res.send("done")
})






router.post("/functionup/colleges", collegeCont.createCollege);



module.exports=router