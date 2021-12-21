const express=require("express")
const router=express.Router()
const {getMain,addEvent,deleteEvent,getOneEvent,editEvent,loadMore,getAll,getTags,addPicture,isActiveEvent,getOneEventFront,search}=require("../contollers/eventController")
router.get("/",getMain)
router.get("/getAll",getAll)
router.post("/addEvent",addEvent)
router.post("/addPicture",addPicture)
router.get("/getOne",getOneEvent)
router.get("/getOneFront",getOneEventFront)
router.post("/edit",editEvent)
router.get("/loadMore",loadMore)
router.post("/isActiveEvents",isActiveEvent)
router.delete("/",deleteEvent)
router.get("/tag",getTags)
router.get("/searchAdmin",search)
module.exports=router