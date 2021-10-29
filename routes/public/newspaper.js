const express=require("express")
const router=express.Router()
const {getAllNewspapers,addNewspaper,getOneNewspaper,editNewspaper,deleteNewspaper}=require("../../contollers/newspaperController")
router.get("/",getAllNewspapers)
router.post("/add",addNewspaper)
router.delete("/",deleteNewspaper)
router.get("/edit",getOneNewspaper)
router.post("/edit",editNewspaper)
module.exports=router
