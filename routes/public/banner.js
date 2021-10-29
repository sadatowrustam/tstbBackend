const express=require("express")
const router=express.Router()
const {allBanners,addBanners,editBanner,addBannersSettings}=require("../../contollers/bannerController")
router.get("/",allBanners)
router.post("/addBanner",addBanners)
router.post("/editBanner",editBanner)
router.get("/bannerSetting",addBannersSettings)
module.exports=router