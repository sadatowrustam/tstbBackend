const {Op}=require("sequelize")
const sharp = require("sharp");
const {Events,Banners}=require("../models/");

exports.addEvent=async (req,res,next)=>{
  console.log(req.body)
  let body={
    TM:req.body.tm,
    RU:req.body.ru, 
    EN:req.body.en
  }
  let tags=req.body.tag
  let header={
    TM:req.body.tmheader,
    RU:req.body.ruheader,
    EN:req.body.enheader
  }
  let date={
    TM:req.body.tmdate,
    RU:req.body.rudate,
    EN:req.body.endate
  }
  let title={
    TM:req.body.tmtitle,
    RU:req.body.rutitle,
    EN:req.body.entitle
  }
  let file=req.files.pic
  let filename=Math.floor(Math.random()*100)+file.name
  file.mv("./public/mysal/"+filename,function(err){if(err){console.log(err)}})
  try{
    let news=await Events.create({pic:filename,name:header,title:title,date:date,body:body,tags:tags})
    await sharp("./public/mysal/"+filename).toFile("./public/events/"+filename)
    return res.json(news)
  }catch(err){
    return res.status(500).json({err:"something went wrong"})
  }
}
exports.editEvent=async(req,res,next)=>{
  let body={
    TM:req.body.tm,
    RU:req.body.ru, 
    EN:req.body.en
  }
  let tags=req.body.tag
  let header={
    TM:req.body.tmheader,
    RU:req.body.ruheader,
    EN:req.body.enheader
  }
  let date={
    TM:req.body.tmdate,
    RU:req.body.rudate,
    EN:req.body.endate
  }
  let title={
    TM:req.body.tmtitle,
    RU:req.body.rutitle,
    EN:req.body.entitle
  }
  let filename
  let uuid=req.query.uuid
  if(req.files==undefined){
    const news = await Events.findOne({ where: { uuid: uuid } });
    filename=news.pic
  }else{
    filename=req.files.pic.name
    filename=Math.floor(Math.random()*100)+filename
  }
  try{
    let news=await Events.update({pic:filename,name:header,title:title,date:date,body:body,tags:tags},{where:{uuid:uuid}})
    if(req.files!=undefined){
      req.files.pic.mv("./public/mysal/"+filename,function(err){
        if(err){
          news=err
        }
      })
      await sharp("./public/mysal/"+filename).toFile("./publi/mysal/"+filename)
    }
    return res.send("sucess")
  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
} 
exports.eventsByTag=async(req,res,next)=>{
  let tag=req.query.tag
  try{
    let news=await Events.findAll({
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
    let news=await Events.findAll({
      order:[["id","DESC"]],
      limit:9,
      attributes:["title","body","pic","date","name","uuid"]
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

exports.deleteEvent=async(req,res,next)=>{
  let uuid=req.query.uuid
  try{
    let news=await Events.destroy({
      where:{"uuid":uuid}
    })
    return res.send(news.toString())
  }catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
  }
}
exports.getOneEvent=async (req,res,next)=>{
  let uuid=req.query.uuid
  try {
    let event=await Events.findOne({
      where:{"uuid":uuid}
    })
    return res.send(event)
  } catch (error) {
    console.log(err)
    return res.status(500).send("something went wrong")
  }
}
exports.loadMore=async (req,res,next)=>{
  let page=req.query.page
  let limit=req.query.limit
  let startIndex=(+page-1)*limit
  let endIndex=+page*limit
  let events
  try{
    events=await Events.findAll({
      order:[["id","DESC"]]}
    )
  }catch(err){
      console.log(err)
      return res.status(500).send("something went wrong")
  }
  return res.send(events.slice(startIndex,endIndex))
}

