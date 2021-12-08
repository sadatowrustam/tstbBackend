const express=require("express")
const router=express.Router()
const{getSponsers,addSponsor,addPic,getOne,editSponsor,deleteSponsor,isActive,getAll}=require("../contollers/sponsorController")
router.get("/",getSponsers)
router.get("/getAll",getAll)
router.post("/add",addSponsor)
router.post("/addPic",addPic)
router.get("/getOne",getOne)
router.post("/edit",editSponsor)
router.delete("/",deleteSponsor)
router.post("/isActive",isActive)
module.exports=router