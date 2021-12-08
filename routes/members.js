const express=require("express")
const router=express.Router()
const {mainMembers,addMember,getOne,editMember,deleteMember,allMembers,addPic,addFile,deleteFile,getBycategory}=require("../contollers/memberController")
router.get("/",allMembers)
router.get("/main",mainMembers)
router.get("/category",getBycategory)
router.post("/add",addMember)
router.get("/getOne",getOne)
router.post("/addPic",addPic)
router.post("/addFile",addFile)
router.post("/edit",editMember)
router.delete("/",deleteMember)
router.delete("/deleteFile",deleteFile)
module.exports=router