const {Op}=require("sequelize")
const sharp = require("sharp");
const fs=require("fs");
const randomstring=require("randomstring");
const {News,News_tags,Banners}=require("../models/")
exports.getAll =async (req, res, next) => {
  try{
    let news=await News.findAll({
      order:[
        ["id","DESC"]
      ]
    })
    return res.send(news)
  }catch(err){
    console.log(err)
    return res.status(500).send({err:"err"})
  }
};
exports.addTags=async(req,res,next)=>{
  console.log(req.body)
  const {tm,ru,en}=req.body
  try{
    const user = await News_tags.create({TM:tm,RU:ru,EN:en})
    return res.send(user)
  }catch(err){
    console.log(err)
    return res.status(400).send({"err":"something went wrong"})
  }
}
exports.addNews=async (req,res,next)=>{
  let body={
    TM:req.body.text,
    RU:req.body.text2, 
    EN:req.body.text3
  }
  let tags=req.body.tag
  let header={
    TM:req.body.headerTM, 
    RU:req.body.headerRU,
    EN:req.body.headerEN
  }
  let date=req.body.date
  let status=req.body.active
  let name=req.body.name
  let topar=req.body.topar
  try{
    let news=await News.create({header:header,date:date,body:body,tags:tags,active:status,name:name,topar:topar})
    return res.send({newsId:news.id})
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.addPicture=async (req,res,next)=>{
  let filename1
  let id=req.query.id
  console.log(57,id)
  let filename
  try {
    filename=await News.findOne({where:{id:id}})
    if(filename.pic!=null){
      filename1=filename.pic
      filename=filename.pic
    }
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
  if(req.files!=undefined){
    let pic=req.files.pic0
    let format="."+pic.name.split(".")[1]
    filename=randomstring.generate(7)+format
    pic.mv("./public/mysal/"+filename,(err)=>{if(err){console.log(err)}})
  }
  try {
    await News.update({pic:filename},{where:{"id":id}})
    await sharp("./public/mysal/"+filename).toFile("./public/news/"+filename)
    if(filename1!=undefined){
      fs.unlink("./public/news/"+filename1,(err)=>{if(err){console.log(err)}})
    }
    return res.send("success")
  }catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.editNews=async(req,res,next)=>{
  let body={
    TM:req.body.text,
    RU:req.body.text2, 
    EN:req.body.text3
  }
  let tags=req.body.tag
  let header={
    TM:req.body.headerTM,
    RU:req.body.headerRU,
    EN:req.body.headerEN
  }
  let filename
  let id=req.query.id
  let status=req.body.active
  let name=req.body.name
  let topar=req.body.topar
  try{
    let news=await News.update({pic:filename,header:header,title:title,date:date,body:body,tags:tags,active:status,name:name,topar:topar},{where:{id:id}})
    return res.send(news.id)
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
} 
exports.newsByTag=async(req,res,next)=>{
  let tag=req.query.tag
  try{
    let news=await News.findAll({
     where:{ tags: { [Op.contains]: [tag] }}
    })
    return res.json(news)
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
}
exports.getMain=async(req,res,next)=>{
  let obj={}
  try{
    let news=await News.findAll({
      order:[["id","DESC"]],
      limit:9,
      attributes:["body","pic","date","name","id"]
    })
    obj.list=news
  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
  try{
    let banner=await Banners.findAll({})
    obj.ads=banner

  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
  try{
    let tags=await News_tags.findAll({
      attributes:["id","ru","tm","en"]
    })
    obj.tags=tags
  }catch(err){}
  return res.send(obj)
}
exports.deleteTag=async(req,res,next)=>{
  let id=req.query.id
  try {
    let tags=await News_tags.destroy({
      where:{"id":id}
    })
    return res.send(tags.toString())
  } catch (error) {
      console.log(error)
      return res.status(500).send("something went wrong")
  }
  
}
exports.deleteNews=async(req,res,next)=>{
  let id=req.query.id
  try{
    let news=await News.destroy({
      where:{"id":id}
    })
    return res.send(news.toString())
  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
}
exports.getOneNews=async (req,res,next)=>{
  let id=req.query.id
  try {
    let news=await News.findOne({
      where:{"id":id}
    })
    return res.send(news)
  } catch (error) {
    console.log(err)
    return res.status(500).send("something went wrong")
  }
}
exports.loadMore=async (req,res,next)=>{
  let page=req.query.page
  let limit=req.query.limit
  let startIndex=(+page)*limit
  let endIndex=(+page+1)*limit
  let news
    try{
      news=await News.findAll({
        order:[["id","DESC"]]}
        )
        return res.send(news.slice(startIndex,endIndex))
    }catch(err){
      console.log(err)
      return res.status(500).send("something went wrong")
    }
}
exports.getTags=async(req,res,next) => {
  try {
    let tags=await News_tags.findAll({order:[["id","DESC"]]})
    return res.send(tags)
  } catch (err) {
    console.log(err)
    return res.status(400).send("Something went wrong")
  }
}
// exports.getOneTag=async(req,res,next)=>{
//   let uuid=req.query.uuid
//   try{
//     let tag=await News_tags.findOne({
//       where:{uuid:uuid}
//     })
//     return res.send(tag)
//   }catch(err){
//     console.log(err)
//     return res.status(500).send("something went wrong")
//   }
// }

// exports.editTag=async(req,res,next)=>{
//   let id=req.query.id
//   let en=req.body.en
//   let tm=req.body.tm
//   let ru=req.body.ru
//   console.log(req.body)
//   try {
//     let tag=await News_tags.update({EN:en,RU:ru,TM:tm},
//       {where:{"id":id}}
//     )
//     return res.send(tag)
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("something went wrong")
//   }

// }