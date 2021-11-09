const express=require("express")
const router=express.Router()
const{getSponsers,addSponser,getOne,editSponsor,deleteSponsor}=require("../../contollers/sponsorController")
router.get("/",getSponsers)
router.post("/add",addSponser)
router.get("/getOne",getOne)
router.post("/edit",editSponsor)
router.delete("/",deleteSponsor)
module.exports=router