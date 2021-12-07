const {Op}=require("sequelize")
const sharp = require("sharp");
const fs=require("fs");
const randomstring=require("randomstring");
const {News,News_tags,Banners,Events}=require("../models/");
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
  const {tm,ru,en}=req.body
  try{
    const user = await News_tags.create({TM:tm,RU:ru,EN:en})
    return res.status(200).send({"status":200})
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
  let id=Number(req.query.id)
  let filename
  try {
    filename=await News.findOne({where:{"id":id}})
    if(filename.pic!=null){
      filename1=filename.pic
      filename=filename.pic
    }
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
    let pic=req.files.pic0
    filename=randomstring.generate(7)+".webp"
    let buffer=await sharp(pic.data).webp({quality:90}).resize(1100,620).toBuffer()
    await sharp(buffer).toFile("./public/news/"+filename)
  try {
    await News.update({pic:filename},{where:{"id":id}})
    if(filename1!=undefined){
      fs.unlink("./public/news/"+filename1,(err)=>{if(err){console.log(err)}})
    }
    return res.status(200).send({status:"success"})
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
  console.log(99,id)
  let status=req.body.active
  let name=req.body.name
  let topar=req.body.topar
  let date=req.body.date
  try{
    await News.update({pic:filename,header:header,date:date,body:body,tags:tags,active:status,name:name,topar:topar},{where:{id:id}})
    return res.status(200).send({newsId:id})
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
} 
exports.newsByTag=async(req,res,next)=>{
  let tag=req.query.tag
  let obj={}
  try{
    let news=await News.findAll({
     where:{ tags: { [Op.contains]: [tag] }}
    })
    obj.list=news
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
  }
  try {
    let events=await Events.findAll({
      where:{tags: { [Op.contains]: [tag] }}
    })
    obj.list2=events
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
  try{
    let banner=await Banners.findAll({order: [["id","ASC"]]})
    obj.ads=banner

  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
  try{
    let tags=await News_tags.findAll({
      attributes:["id","RU","TM","EN"]
    })
    obj.tegs=tags
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
  return res.send(obj)
}
exports.getMain=async(req,res,next)=>{
  let obj={}
  try{
    let news=await News.findAll({
      order:[["id","DESC"]],
      where:{"active":"true"},
      limit:9,
      attributes:["body","pic","date","name","id","header","tags"],
    })
    obj.list=news
  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
  try{
    let banner=await Banners.findAll({order: [["id","ASC"]]})
    obj.ads=banner

  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
  try{
    let tags=await News_tags.findAll({
      attributes:["id","RU","TM","EN"]
    })
    obj.tegs=tags
  }catch(err){
    console.log(err)
    return res.status(400).send("something went wrong")
  }
  try {
    let events=await Events.findAll({order: [["id","DESC"]],
    where:{"active":"true"},
    limit:9,
    attributes:["body","pic","date","name","id","header","tags"]})
    obj.list2=events
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
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
    let tags=await News_tags.findAll({order: [["id","DESC"]]})
    return res.status(200).send([news,tags])
  } catch (err) {
    console.log(err)
    return res.status(500).send("something went wrong")
  }
}
exports.getOneNewsFront=async (req,res,next)=>{
  let id=req.query.id
  try {
    let news=await News.findOne({
      where:{"id":id}
    })
    return res.status(200).send(news)
  } catch (err) {
    console.log(err)
    return res.status(500).send("something went wrong")
  }

}
exports.loadMore=async (req,res,next)=>{
  let page=req.query.page
  let limit=req.query.limit
  let startIndex=(+page)*limit
  let endIndex=(+page+1)*limit
  console.log(startIndex,endIndex)
  let news
  let tag=req.query.tag
  console.log(tag)
    try{
      if(tag!="undefined"){
        console.log("shu ishledi")
        news=await News.findAll({
          order:[["id","DESC"]],where:{"active":"true"},
          where:{ tags: { [Op.contains]: [tag] }}
        })
      }else{
        news=await News.findAll({
          order:[["id","DESC"]],where:{"active":"true"}})
        }
        console.log(news.length)
        let spliced=news.splice(startIndex,limit)
        console.log(spliced.length)
      return res.send(spliced)
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
exports.isActiveNews=async (req,res,next)=>{
  let active=req.body.data
  let id=req.body.id
  try {
    await News.update({active:active},{where:{"id":id}})
    return res.status(200).send("sucesss")
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