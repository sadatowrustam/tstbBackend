const express=require("express")
const router=express.Router()
const {getMain, addCommerce,getAll,getOne,editCommmerce,deleteCommerce,deletePic,addCategory,getCategory,deleteCategory}=require("../../contollers/commerceController")
router.get("/",getMain)
router.post("/",addCommerce)
router.delete("/",deleteCommerce)
router.get("/getAll",getAll)
router.get("/getOne",getOne)
router.post("/edit",editCommmerce)
router.delete("/pic",deletePic)
router.post("/addCategory",addCategory)
router.get("/getCategory",getCategory)
router.delete("/deleteCategory",deleteCategory)
module.exports=router