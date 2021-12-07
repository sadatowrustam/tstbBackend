const express=require("express")
const router=express.Router()
const {setting,login,update}=require("../contollers/loginController")
router.get("/setting",setting)
router.post("/",login)
router.post("/edit",update)
module.exports=router