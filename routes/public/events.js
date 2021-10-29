const express=require("express")
const router=express.Router()
const {getMain,addEvent,deleteEvent,getOneEvent,editEvent,loadMore}=require("../../contollers/eventController")

router.get("/",getMain)
router.post("/",addEvent)
router.get("/edit",getOneEvent)
router.post("/edit",editEvent)
router.get("/loadMore",loadMore)
router.delete("/",deleteEvent)
module.exports=router