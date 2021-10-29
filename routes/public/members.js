const express=require("express")
const router=express.Router()
const {mainMembers,addMember}=require("../../contollers/memberController")

router.get("/main",mainMembers)
router.get("/main")
router.post("/add",addMember)
module.exports=router