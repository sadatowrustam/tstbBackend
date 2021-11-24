const{Member}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
const rimraf=require("rimraf")
const randomstring=require("randomstring")

exports.allMembers=async(req,res,next)=>{
    try {
        let members=await Member.findAll({order: [["id","DESC"]]})
        return res.json(members)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.mainMembers=async(req,res,next)=>{
    try{
        let members=await Member.findAll({
            order:[
                ['id',"DESC"]
            ],
            where:{"main":"true"},
            attributes:["uuid","pic","name"]
        })
        return res.json(members)
    }catch(err){
        console.log(err)

        return res.json({"err":"something went wrong"})
    }
}
exports.addMember=async(req,res,next)=>{
    let name=req.body.name
    let name1=name
    let link=req.body.web
    let member=req.body.member
    let email=req.body.email
    let address={
        tm:req.body.tmAddress,
        ru:req.body.ruAddress,
        en:req.body.enAddress
    }
    let body={
        tm:req.body.text,
        ru:req.body.text2,
        en:req.body.text3
    }
    let extra=req.body.extra
    let welayat=req.body.welayat
    let main=req.body.main
    let members=[]
    if(typeof(member)=="string"){
        members.push(member)
    }else{
        members=member
    }
    fs.mkdir("./public/member/"+name1,(err)=>{if(err){console.log(err)}})
    fs.mkdir("./public/member/"+name1+"/logo",(err)=>{if(err){console.log(err)}})
    fs.mkdir("./public/member/"+name1+"/docs",(err)=>{if(err){console.log(err)}})
    console.log(members)
    try{
        let member1=await Member.create({name:name1,link:link,category:members,email:email,welayat:welayat,body:body,extra:extra,main:main,address:address})
        return res.json({id:member1.id})
    }catch(err){
        console.log(err)
        rimraf("./public/member/"+name1,()=>{console.log("done 74")})
        return res.status(400).json({err:"something went wrong"})
    }
}
exports.getOne=async(req,res,next)=>{
    let id=req.query.id
    try {
        let member=await Member.findOne({where:{"id":id}})
        return res.send(member)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editMember = async(req, res,next) => {
    let id=req.query.id
    let name=req.body.name
    let link=req.body.web
    let member=req.body.membership
    let email=req.body.email
    let body={
        tm:req.body.text,
        ru:req.body.text2,
        en:req.body.text3
    }
    let extra=req.body.extra
    let welayat=req.body.welayat
    let main=req.body.main
    let docs=[]
    let docname=[]
    let members=[]
    let foldername
    try {
       let member=await Member.findOne({where:{id:id}})
       foldername=member.name
       startIndex=docs.length-1
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
    if(foldername!=name){
        console.log("menzesh dal",foldername,name)
        fs.rename("./public/member/"+foldername,"./public/member/"+name,(err)=>{if(err){console.log(err)}})
    }
    if(typeof(member)=="string"){
        members.push(member)
    }else{
        members=member
    }
    try{
        let member=await Member.update({name:name,link:link,pic:logoname,files:docname,category:members,email:email,welayat:welayat,body:body,extra:extra,main:main},{where:{"id":id}})
        return res.json(member)
    }catch(err){
        console.log(err)

        return res.status(500).json({err:"something went wrong"})
    }
}
exports.deleteMember=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Member.destroy({where:{id:id}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.addPic=async(req,res,next)=>{
  const date=new Date()

  let filename1
  let id=req.query.id
  let filename
  let name
  try {
    filename=await Member.findOne({where:{id:id}})
    if(filename.pic!=null){
      filename1=filename.pic
    }
    name=filename.name
  }catch (err) {
    console.log(err)
    return res.status(400).json({err:"something went wrong"})
  }
    let pic=req.files.pic0
    // let format="."+pic.name.split(".")[1]
    filename=pic.name
    await pic.mv("./public/member/"+name+"/logo/"+filename,(err)=>{if(err){console.log(155,err)}})
    // await sharp("./public/member/"+filename).toFile("./public/member/"+name+"/logo/"+(1+filename))
    try {
        await Member.update({pic:filename},{where:{id:id}})
    if(filename1!=undefined){
      fs.unlink("./public/member/"+name+"/docs/"+filename1,(err)=>{if(err){console.log(err)}})
    }
    return res.status(200).json({status:"success"})
  }catch (err) {
    console.log(err)
    return res.status(400).json({err:"something went wrong"})
  }
}
////////////////
exports.addFile=async(req,res,next)=>{
    let filename1
    let id=req.query.id
    let filename
    let allfiles=[]
    let name
    try {
      filename=await Member.findOne({where:{id:id}})
      if(filename.files!=null){
        allfiles=filename.files
      }
      name=filename.name
    }catch (err) {
      console.log(err)
      return res.status(400).send("something went wrong")
    }
    let pic=Object.values(req.files)
    if(typeof(filename)=="string"){allfiles.push(filename)}
    for(let i=0;i<pic.length;i++){
          filename=pic[i].name
          await pic[i].mv("./public/member/"+name+"/docs/"+filename,(err)=>{if(err){console.log(err)}})
          allfiles.push(filename)
      }
    try {
      await Member.update({files:allfiles},{where:{"id":id}})
      return res.status(200).json({status:"success"})
    }catch (err) {
      console.log(199,err)
      return res.status(400).json({err:"something went wrong"})
    }
}