const express =require("express")
const router=express.Router()
const {addSettings,getMembership,getAboutUs,getConsultation,
addPic,editMembership,editAboutUs,editConsultation,
getAllBussiness,getAllLicense,getOneBussiness,getOneLicense,
addBussiness,editBussiness,addBussinessFile,deleteBussinessFile,deleteBussiness,
addLicense,editLicense,deleteLicense,addLicenseFile,deleteLicenseFile,getLicenseHeader,
addStatistika,getStatistika,editStatistika
}=require("../contollers/menuController")
router.get("/addSettings", addSettings)
router.get("/getMembership",getMembership)
router.get("/getConsultation",getConsultation)
router.get("/addStatistika",addStatistika)
router.get("/getStatistika",getStatistika)
router.post("/statistikaAdmin",editStatistika)
router.get("/getAboutUs",getAboutUs)
router.post("/addPic",addPic)
router.post("/editConsultation",editConsultation)
router.post("/editMembership",editMembership)
router.post("/editAboutUs",editAboutUs)
router.get("/getAllBussiness",getAllBussiness)
router.get("/getAllLicense",getAllLicense)
router.get("/getLicenseHeader",getLicenseHeader)
router.get("/getOneBussiness",getOneBussiness)
router.get("/getOneLicense",getOneLicense)
router.post("/addBussiness",addBussiness)
router.post("/editBussiness",editBussiness)
router.delete("/deleteBussiness",deleteBussiness)
router.post("/addBussinessFile",addBussinessFile)
router.delete("/deleteBussinessFile",deleteBussinessFile)
router.post("/addLicense",addLicense)
router.post("/editLicense",editLicense)
router.post("/addLicenseFile",addLicenseFile)
router.delete("/deleteLicense",deleteLicense)
router.delete("/deleteLicenseFile",deleteLicenseFile)
module.exports =router