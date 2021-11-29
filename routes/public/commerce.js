const express=require("express")
const router=express.Router()
const {getMain, addCommerce,getAll,getOne,editCommmerce,deleteCommerce,deletePic,addCategory,getCategory,deleteCategory,getCategorySimple,addPic}=require("../../contollers/commerceController")
router.get("/",getMain)
router.post("/",addCommerce)
router.delete("/",deleteCommerce)
router.get("/getAll",getAll)
router.get("/getOne",getOne)
router.post("/edit",editCommmerce)
router.delete("/pic",deletePic)
router.post("/addPic",addPic)
router.post("/addCategory",addCategory)
router.get("/getCategory",getCategory)
router.get("/getCategorySimple",getCategorySimple)
router.delete("/deleteCategory",deleteCategory)
module.exports=router