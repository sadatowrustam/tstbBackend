const {Op}=require("sequelize")
const sharp = require("sharp");
const {News,News_tags,Banners}=require("../models/")
exports.getFour =async (req, res, next) => {
  try{
    let news=await News.findAll({
      order:[
        ["id","DESC"]
      ],
      attributes:["name","title","pic"],
      limit:4,
    })
    return res.json({list:news})
  }catch(err){
    console.log(err)
    return res.status(500).send({err:"err"})
  }
};
exports.addTags=async(req,res,next)=>{
  const {tm,ru,en}=req.body
  console.log(req.body)
  try{
    const user = await News_tags.create({TM:tm,RU:ru,EN:en})
    return res.json(user)
  }catch(err){
    console.log(err)
    return res.status(00).json({"err":"something went wrong"})
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
  
  console.log(body,header,date,title)
  let file=req.files.pic
  let filename=Math.floor(Math.random()*100)+file.name
  file.mv("./public/mysal/"+filename,function(err){if(err){console.log(err)}})
  try{
    let news=await News.create({pic:filename,name:header,date:date,body:body,tags:tags})
    await sharp("./public/mysal/"+filename).toFile("./public/news/"+filename)
    return res.json(news)
  }catch(err){
    return res.status(500).json({err:"something went wrong"})
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
  let uuid=req.query.uuid
  if(req.files==undefined){
    const news = await News.findOne({ where: { uuid: uuid } });
    filename=news.pic
  }else{
    filename=req.files.pic.name
    filename=Math.floor(Math.random()*100)+filename
  }
  try{
    let news=await News.update({pic:filename,name:header,title:title,date:date,body:body,tags:tags},{where:{uuid:uuid}})
    if(req.files!=undefined){
      req.files.pic.mv("./public/mysal/"+filename,function(err){
        if(err){
          news=err
        }
      })
      await sharp("./public/mysal/"+filename).toFile("./publi/mysal/"+filename)
    }
    return res.json(news)
  }catch(err){
    console.log(err)
    return res.status(500).json(err)
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
      attributes:["uuid","ru","tm","en"]
    })
    obj.tags=tags
  }catch(err){}
  return res.send(obj)
}
exports.getOneTag=async(req,res,next)=>{
  let uuid=req.query.uuid
  try{
    let tag=await News_tags.findOne({
      where:{uuid:uuid}
    })
    return res.send(tag)
  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
}
exports.editTag=async(req,res,next)=>{
  let id=req.query.id
  let en=req.body.en
  let tm=req.body.tm
  let ru=req.body.ru
  console.log(req.body)
  try {
    let tag=await News_tags.update({EN:en,RU:ru,TM:tm},
      {where:{"id":id}}
    )
    return res.send(tag)
  } catch (error) {
    console.log(error);
    return res.status(500).send("something went wrong")
  }

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