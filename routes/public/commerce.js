const express=require("express")
const router=express.Router()
const {getMain}=require("../../contollers/commerceController")
router.get("/",getMain)
router.post("/")
module.exports=router