const express=require("express")
const {addSettings,editProvince,getProvince}=require("../../contollers/provinceController")
const router=express.Router()
router.get("/addSettings",addSettings)
router.get("/editProvince",getProvince)
router.post("/editProvince",editProvince)
module.exports=router