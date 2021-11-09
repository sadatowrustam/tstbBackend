const express=require("express")
const router=express.Router()
const {mainMembers,addMember,getOne,editMember,deleteMember}=require("../../contollers/memberController")
router.get("/main",mainMembers)
router.post("/add",addMember)
router.get("/getOne",getOne)
router.post("/edit",editMember)
router.delete("/",deleteMember)
module.exports=router