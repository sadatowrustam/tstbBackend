const express=require("express")
const router=express.Router()
const{addUser,getUsers,deleteUser}=require("../contollers/mailController")
router.get("/",getUsers)
router.post("/",addUser)
router.delete("/",deleteUser)

module.exports=router