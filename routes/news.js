

const express=require("express")
const {getMain,addTags,addNews,editNews,newsByTag,deleteTag,deleteNews,getOneNews,loadMore,getAll,getTags,addPicture,isActiveNews,getOneNewsFront,search}=require("../contollers/newsController")
const router=express.Router()
//news
router.get("/",getMain)
router.get("/getAll",getAll)
router.get("/loadMore",loadMore)
router.post("/addNews",addNews)
router.post("/addPicture",addPicture)
router.get("/getOne",getOneNews)
router.get("/getOneFront",getOneNewsFront)
router.post("/edit",editNews)
router.delete("/",deleteNews)
router.post("/isActiveNews",isActiveNews)
router.get("/search",search)
//tags
router.get("/tag",getTags)
router.get("/tags",newsByTag)
router.post("/tags",addTags)
// router.get("/tags/edit",getOneTag)
// router.post("/tags/edit",editTag)
router.delete("/tags",deleteTag)

module.exports=router