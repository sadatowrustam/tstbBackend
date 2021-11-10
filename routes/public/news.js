  const express=require("express")
const {getMain,addTags,addNews,editNews,newsByTag,getOneTag,editTag,deleteTag,deleteNews,getOneNews,loadMore}=require("../../contollers/newsController")

const router=express.Router()
//news
router.get("/",getMain)
router.get("/loadMore",loadMore)
router.post("/addNews",addNews)
router.get("/getOne",getOneNews)
router.post("/edit",editNews)
router.delete("/",deleteNews)
//tags
router.get("/tags",newsByTag)
router.post("/tags",addTags)
router.get("/tags/edit",getOneTag)
router.post("/tags/edit",editTag)
router.delete("/tags",deleteTag)

module.exports=router