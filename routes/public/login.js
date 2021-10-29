const express=require("express")
const router=express.Router()
const {setting,login}=require("../../contollers/loginController")
router.get("/setting",setting)
router.post("/",login)
module.exports=router