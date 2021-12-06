const {Menu,Bussiness,License}=require('../models')
const randomstring = require("randomstring")
const fs=require("fs")
const sharp=require("sharp")

exports.addSettings=async(req,res,next)=>{
    try {
        await Menu.create({body:{en:[""],ru:[""],tm:[""],},header:{en:[""],ru:[""],tm:[""]}})//consultation
        await Menu.create({body:{en:[""],ru:[""],tm:[""],},header:{en:[""],ru:[""],tm:[""]}})//membership
        await Menu.create({body:{en:[""],ru:[""],tm:[""],},header:{en:[""],ru:[""],tm:[""]}})//about us

        return res.send("sucess")
    } catch (err) {
        console.log(err)
    }
}
exports.getMembership=async(req,res,next)=>{
  try {
    let about=await Menu.findOne({where:{id:2}})
    return res.status(200).send(about)
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.editMembership=async(req,res,next)=>{
  let body={
      tm:toArray(req.body.text),
      ru:toArray(req.body.text2),
      en:toArray(req.body.text3)
  }
  let header={
      tm:toArray(req.body.tmheader),
      ru:toArray(req.body.ruheader),
      en:toArray(req.body.enheader)
  } 
  try {
      await Menu.update({body:body,header:header,},{where:{"id":2}})
      return res.status(200).send({id:2})
  } catch (err) {
      console.log(err)
      return res.status(400).send({message:err.message})   
  }
}
exports.getConsultation=async(req,res,next) => {
  let boshmy=false
  try {
    let about=await Menu.findOne({where:{id:1}})
    if(about.pic!=null){
      about.pic.forEach((e,i)=>{
        if(e==" "){about.pic.splice(i,1);boshmy=true}
      })
      if(boshmy){await Menu.update({pic:about.pic},{where:{id:1}})
    }
    about=await Menu.findOne({where:{id:1}})
  }
    return res.status(200).send(about)
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.editConsultation=async(req,res,next)=>{
  let files 
  let allfiles=[]
  try {
    files=await Menu.findOne({where:{id:1}})
    allfiles=files.pic
  } catch (err) {
    console.log(err)
    return res.status(400).send({message:"something went wrong"})
  }
    let header={
        tm:toArray(req.body.tmheader),
        ru:toArray(req.body.ruheader),
        en:toArray(req.body.enheader)
    }
    let body={
        tm:toArray(req.body.text),
        ru:toArray(req.body.text2),
        en:toArray(req.body.text3)
    }
    let bosh=req.body.bosh
  if(bosh[0]!=undefined){
  console.log("shu ishledi bosh")
  for(let i=0;i<bosh.length;i++){
    fs.unlink("./public/menu/"+files.pic[(bosh[i]-i)],(err)=>{if(err){console.log(err)}})
    allfiles.splice((bosh[i]-i),1," ")
  }
}
    try {
        await Menu.update({header:header,body:body},{where:{"id":1}})
        return res.send({id:1})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message: err.message})   
    }
}
exports.getAboutUs=async(req, res, next) => {
  let boshmy=false
  try {
    let about=await Menu.findOne({where:{id:3}})
    if(about.pic!=null){
      about.pic.forEach((e,i)=>{
        if(e==" "){about.pic.splice(i,1);boshmy=true}
      })
      if(boshmy){await Menu.update({pic:about.pic},{where:{id:3}})
    } 
    about=await Menu.findOne({where:{id:3}})
  }
    return res.status(200).send(about)
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.editAboutUs=async(req,res,next)=>{
  let files 
  let allfiles=[]
  try {
    files=await Menu.findOne({where:{id:3}})
    allfiles=files.pic
  } catch (err) {
    console.log(err)
    return res.status(400).send({message:"something went wrong"})
  }
  let header={
    tm:toArray(req.body.tmheader),
    ru:toArray(req.body.ruheader),
    en:toArray(req.body.enheader)
}
let body={
    tm:toArray(req.body.text),
    ru:toArray(req.body.text2),
    en:toArray(req.body.text3)
}
let bosh=req.body.bosh
if(bosh[0]!=undefined){
  console.log("shu ishledi bosh")
  for(let i=0;i<bosh.length;i++){
    fs.unlink("./public/menu/"+files.pic[(bosh[i]-i)],(err)=>{if(err){console.log(err)}})
    allfiles.splice((bosh[i]-i),1," ")
  }
}
console.log(allfiles)
try {
    await Menu.update({body:body,header:header,pic:allfiles},{where:{"id":3}})
    return res.send({id:3})
} catch (err) {
    console.log(err)
    return res.status(400).send({message: err.message})   
}
}           
exports.addPic=async(req,res,next)=>{
  let id=req.query.id
  let filename
  let name
  let allfiles=[]
  let newfiles=[]
  try {
    filename=await Menu.findOne({where:{id:id}})
    if(filename.pic!=null){
      allfiles=filename.pic
    }
    name=filename.name
  }catch (err) {
    console.log(err)
    return res.status(400).json({err:"something went wrong"})
  }

  let sana=0
    let pic=Object.values(req.files)
    let pic1=req.files
    for (let i=0; i<pic.length; i++) {
      filename=randomstring.generate(7)+".webp"
      let buffer=await sharp(pic[i].data).webp({quality: 90}).resize(1200,720).toBuffer()
      await sharp(buffer).toFile("./public/menu/"+filename)
      newfiles.push(filename)
    }

    let uzynlyk=allfiles.length+newfiles.length
    if(allfiles.length==0 || allfiles.length==undefined){uzynlyk=1}else{uzynlyk=allfiles.length}
    if(allfiles.length!=0 &&allfiles.length<newfiles.length){console.log(156);uzynlyk=pic.length}
    console.log(uzynlyk)
    for (let j=0; j<=uzynlyk; j++){
      let x="pic"+j
 
      if(pic1[x]!=undefined && allfiles[j]!=undefined){
        console.log(151,x)
        fs.unlink("./public/menu/"+allfiles[j],(err)=>{if(err){console.log(122,err)}})
        allfiles.splice(j,1,newfiles[sana]);
        sana+=1
      }else if(pic1[x]!=undefined &&allfiles[j]==undefined){console.log(155,"shu ishledi");allfiles.push(newfiles[sana]);sana+=1}
      else if(pic1[x]!=undefined &&allfiles[j]==" "){
 
        for (let k=j;k>0;k--){if(allfiles[k]!=" "){allfiles.splice(k,1,newfiles[sana]);sana+=1;break}}
      }
}

    try {
        await Menu.update({pic:allfiles},{where:{id:id}})
        return res.status(200).json({status:"success"})
  }catch (err) {
    console.log(err)
    return res.status(400).json({err:"something went wrong"})
  }
}
exports.getAllBussiness=async(req,res,next)=>{
  
  try {
    let bussiness=await Bussiness.findAll({order: [["id","DESC"]]})
    return res.status(200).send({bussiness:bussiness})
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.getOneBussiness=async(req,res,next) => {
  let id=req.query.id
  try {
    let bussiness = await Bussiness.findOne({where: {"id":id}})
    return res.status(200).send(bussiness)
  } catch (err) {
    console.log(err)
    return res.status(400).send({message: "something went wrong"})
  }
}
exports.addBussiness=async(req,res,next)=>{
  let header={
    tm:req.body.tmheader,
    ru:req.body.ruheader,
    en:req.body.enheader
  }
  let body={
    tm:req.body.text,
    ru:req.body.text2,
    en:req.body.text3
  }
  try {
    let bussiness=await Bussiness.create({header:header, body:body})
    fs.mkdir("./public/bussiness/"+bussiness.id,(err)=>{if(err){console.log(err)}})
    return res.status(200).send({id:bussiness.id})
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.editBussiness=async(req,res,next)=>{
  let id=req.query.id
  let header={
    tm:req.body.tmheader,
    ru:req.body.ruheader,
    en:req.body.enheader
  }
  let body={
    tm:req.body.text,
    ru:req.body.text2,
    en:req.body.text3
  }
  try {
    await Bussiness.update({header:header, body:body},{where: {id:id}})
    return res.status(200).send({id:Number(id)})
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.deleteBussiness=async(req,res,next)=>{
  let id=req.query.id
  try {
    await Bussiness.destroy({where:{id:id}})
    return res.status(200).send({status:200})
  } catch (err) {
    console.log(err)
    return res.status(400).send({status:"error"})
  }
}
exports.addBussinessFile=async(req,res,next)=>{
  let id=req.query.id
  let allfiles=[]
  try {
    let bussiness=await Bussiness.findOne({where:{id:id}})
    if(bussiness.files!=undefined){
      allfiles=bussiness.files
    }
  } catch (err) {
      console.log(err)
      return res.status(400).send({message:"something went wrong"})
  }
  let pic=Object.values(req.files)
  for(let i=0;i<pic.length;i++){
        filename=pic[i].name
        await pic[i].mv("./public/menu/"+filename,(err)=>{if(err){console.log(err)}})
        let obj={
            filename:filename,
            size:size(pic[i].size)
        }
        allfiles.push(obj)
    }
  console.log(allfiles)
  try {
    await Bussiness.update({files:allfiles},{where:{id:id}})
    return res.status(200).json({status:"success"})
  }catch (err) {
    console.log(err)
    return res.status(400).json({err:"something went wrong"})
  }
}
exports.deleteBussinessFile=async(req,res,next)=>{
  let id=req.query.id
  let index=req.query.index
  let allfiles
  try {
    let files=await Bussiness.findOne({where: {id:id}})
    fs.unlink("./public/bussiness/"+files.id+"/"+files.files[index],(err)=>{if(err){console.log(err)}})
    files.files.splice(index,1)
    allfiles =files.files 
    await Bussiness.update({files:allfiles},{where:{id:id}})
    return res.status(200).send({status:"success"})
  } catch (err) {
    console.log(err)
    return res.status(400).send("somthing went wrong")
  }
}
exports.getAllLicense=async(req,res,next)=>{
  try {
    let license=await License.findAll({order: [["id","DESC"]]})
    return res.status(200).send(license)
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.getLicenseHeader=async(req,res,next)=>{
  try {
    let license=await License.findAll({order: [["id","DESC"]],attributes:["id","header"]})
    return res.status(200).send(license)
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.getOneLicense=async(req,res,next) => {
  let id=req.query.id
  try {
    let license = await License.findOne({where: {"id":id}})
    return res.status(200).send(license)
  } catch (err) {
    console.log(err)
    return res.status(400).send({message: "something went wrong"})
  }
}
exports.addLicense=async(req,res,next)=>{
  let header={
    tm:req.body.tmheader,
    ru:req.body.ruheader,
    en:req.body.enheader
  }
  let body={
    tm:req.body.text,
    ru:req.body.text2,
    en:req.body.text3
  }
  try {
    let license=await License.create({header:header, body:body})
    fs.mkdir("./public/license/"+license.id,(err)=>{if(err){console.log(err)}})
    return res.status(200).send({id:license.id})
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.editLicense=async(req,res,next)=>{
  let id=req.query.id
  let header={
    tm:req.body.tmheader,
    ru:req.body.ruheader,
    en:req.body.enheader
  }
  let body={
    tm:req.body.text,
    ru:req.body.text2,
    en:req.body.text3
  }
  try {
    await License.update({header:header, body:body},{where: {id:id}})
    return res.status(200).send({id:Number(id)})
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.deleteLicense=async(req, res,next) => {
  let id = req.query.id
  try {
    await License.destroy({where:{id:id}})
    return res.status(200).send({status:"success"})
  } catch (err) {
    console.log(err)
    return res.status(400).send("something went wrong")
  }
}
exports.addLicenseFile=async(req,res,next)=>{
  let id=req.query.id
  let allfiles=[]
  try {
    let license=await License.findOne({where:{id:id}})
    if(license.files!=undefined){
      allfiles=license.files
    }
  } catch (err) {
      console.log(err)
      return res.status(400).send({message:"something went wrong"})
  }
  let pic=Object.values(req.files)
  for(let i=0;i<pic.length;i++){
        filename=pic[i].name
        await pic[i].mv("./public/menu/"+filename,(err)=>{if(err){console.log(err)}})
        let obj={
            filename:filename,
            size:size(pic[i].size)
        }
        allfiles.push(obj)
    }
  console.log(allfiles)
  try {
    await License.update({files:allfiles},{where:{id:id}})
    return res.status(200).json({status:"success"})
  }catch (err) {
    console.log(err)
    return res.status(400).json({err:"something went wrong"})
  }
}
exports.deleteLicenseFile=async(req,res,next)=>{
  let id=req.query.id
  let index=req.query.index
  let allfiles
  try {
    let files=await License.findOne({where:{id:id}})
    fs.unlink("./public/license/"+id+"/"+files.files[index],(err)=>{if(err){console.log(err)}})
    console.log(files.files)
    files.files.splice(index,1)
    allfiles=files.files
    console.log(files.files)
    console.log(allfiles)
    await License.update({files:allfiles},{where:{id:id}})
    return res.status(200).send({status:200})
  } catch (err) {
    console.log(err)
    return res.status(400).send("somthing went wrong")
  }
}

function toArray(el){
    let array=[]
    if(typeof (el) === 'string'){
        array.push(el)
        return array
    }else{return el}
}
function size(file){
  let size = 0
  let status
  size=Math.round(file/1024)
  status="Kb"
  if(size>1024){
    size=size/1024
    size=size.toFixed(2)
    status="Mb"
  }
  return size+status
}