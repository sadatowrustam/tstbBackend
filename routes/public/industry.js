const express=require("express")
const router=express.Router()
const{addIndustry,addSubcategory,editSubcategory,getMain,getOneIndsutry,editIndustry, deleteIndustry, deleteSubcategory,getOneSubcategory,addPic}=require("../../contollers/industryController")
router.get("/",getMain)
router.post("/",addIndustry)
router.delete("/",deleteIndustry)
router.get("/getOne",getOneIndsutry)
router.post("/edit",editIndustry)
router.post("/addPic",addPic)
router.get("/subcategory",getOneSubcategory)
router.post("/subcategory",addSubcategory)
router.post("/subcategory/edit",editSubcategory)
router.delete("/subcategory",deleteSubcategory)
module.exports=router