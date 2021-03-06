const express=require("express")
const router=express.Router()
const {getAllNewspapers,addNewspaper,getOneNewspaper,editNewspaper,deleteNewspaper,addPic,addFile,isActiveNewspaper, downloadFile,getAllNewspaperFront,search}=require("../contollers/newspaperController")
router.get("/",getAllNewspapers)
router.get("/front",getAllNewspaperFront)
router.post("/add",addNewspaper)
router.post("/addPic",addPic)
router.post("/addFile",addFile)
router.get("/getOne",getOneNewspaper)
router.post("/edit",editNewspaper)
router.delete("/",deleteNewspaper)
router.post("/isActiveNewspaper",isActiveNewspaper)
router.get("/download",downloadFile)
router.get("/searchAdmin",search)
module.exports=router
