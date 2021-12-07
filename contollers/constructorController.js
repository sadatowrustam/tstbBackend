const {Constructor,Constructorcategory}=require("../models")
const randomstring = require("randomstring")
const fs=require("fs")
const sharp= require("sharp")
const rimraf=require("rimraf")
exports.addConstructor=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    try {
        await Constructorcategory.create({name:name})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.allConstructors=async(req,res,next)=>{
    try {
        let constructor=await Constructorcategory.findAll({order: [["id","DESC"]]})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.allConstructorsPro=async(req,res,next)=>{
    try {
        let constructor=await Constructorcategory.findAll({order: [["id","DESC"]],include:{association:"constructors",attributes:["id","name"]}})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.getOneConstructor=async(req,res,next)=>{
    let id=req.query.id
    try {
        let constructor=await Constructorcategory.findOne({where:{"id":id},include:["constructors"]})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOneConstructorSimple=async(req,res,next)=>{
    let id=req.query.id
    try {
        let constructor=await Constructorcategory.findOne({where:{"id":id},include:["constructors"]})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editConstructor=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let id=req.query.id
    try {
        await Constructorcategory.update({name:name},{where:{id:id}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.deleteConstructor=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Constructorcategory.destroy({where:{id:id}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.addSubcategory=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let body={
        TM:req.body.text,
        RU:req.body.text2,
        EN:req.body.text3
    }
    let header={
        TM:req.body.tmheader,
        RU:req.body.ruheader,
        EN:req.body.enheader
    }
    let category=req.body.category
    let shablon=req.body.shablon 
    let banner=req.body.banner
    try {
        let subcategory=await Constructor.create({header:header,name:name,body:body,bannerId:banner,constructorId:category,page:shablon})
        fs.mkdir("./public/constructor/"+subcategory.id,(err)=>{if(err){console.log(err)}})
        return res.send({id:subcategory.id})
    }catch (err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOneSubcategory=async(req,res,next)=>{
    let boshmy=false
    let id=req.query.id
    try {
        let category = await Constructor.findOne({where:{id:id},include:"banner"})
        if(category.pic!=null){
            category.pic.forEach((e,i)=>{
            if(e==" "){category.pic.splice(i,1);boshmy=true}
        })
        if(boshmy){await Constructor.update({pic:category.pic},{where:{id:id}})
        category = await Constructor.findOne({where:{id:id}})
    }
}
    return res.send(category)
}  
    catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSubcategory=async(req,res,next) => {
    let files 
    let allfiles=[]
    let id=req.query.id
    let constructorId
  try {
    files=await Constructor.findOne({where:{id:id}})
    allfiles=files.pic
    constructorId=files.constructorId
  } catch (err) {
    console.log(err)
    return res.status(400).send({message:"something went wrong"})
  }
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let body={
        TM:req.body.text,
        RU:req.body.text2,
        EN:req.body.text3
    }
    let header={
        TM:req.body.tmheader,
        RU:req.body.ruheader,
        EN:req.body.enheader
    }
    let category=req.body.category
    let shablon=req.body.shablon 
    let banner=req.body.banner
    let bosh=req.body.bosh
    if(bosh[0]!=undefined){
      console.log("shu ishledi bosh")
      if(shablon!=1){
          for(let i=0;i<bosh.length;i++){
            fs.unlink("./public/constructor/"+id+"/"+files.pic[(bosh[i]-i)],(err)=>{if(err){console.log(err)}})
            allfiles.splice((bosh[i]-i),1," ")
        }
      }else{
        for(let i=0;i<bosh.length;i++){
          let hasap=(bosh[i]*2)-1
          allfiles.splice(hasap,1," ")
          allfiles.splice(hasap+1,1," ")
        }
      }
    }
    try {
        await Constructor.update({header:header,name:name,body:body,bannerId:banner,constructorId:category,page:shablon,pic:allfiles},{where:{id:id}})
        return res.status(200).send({id:Number(constructorId)},)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.deleteSubcategory =async(req,res,next)=>{
    let id=req.query.id
    try {
        await Constructor.destroy({where:{id:id}})
        rimraf("./public/constructor/"+id,(err)=>{if(err){console.log(err)}})
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({status:"bolmady"})
    }
}
exports.addPic=async(req,res,next)=>{
    let id=req.query.id
    let filename
    let allfiles=[]
    let newfiles=[]

    try {
        filename=await Constructor.findOne({where:{id:id}})
        if(filename.pic!=null){
        allfiles=filename.pic
        }
    }catch (err) {
        console.log(err)
        return res.status(400).json({err:"something went wrong"})
    }
    let sana=0

    let pic=Object.values(req.files)
    let pic1=req.files
    for(let i=0; i<pic.length; i++) {
    let a=await sharp(pic[i].data).webp({quality:90}).resize(1024,728).toBuffer()
    let filename=randomstring.generate(7)+".webp"
    await sharp(a).toFile("./public/constructor/"+id+"/"+filename)
    newfiles.push(filename)
    }   
    let uzynlyk=newfiles.length+allfiles.length
    console.log(allfiles.length,newfiles.length)
    // if(allfiles.length==0 || allfiles.length==undefined){uzynlyk=1}else{uzynlyk=allfiles.length}
    // if(allfiles.length!=0 &&allfiles.length<newfiles.length){console.log(156);uzynlyk=pic.length}
    console.log(uzynlyk)
    console.log(allfiles,newfiles)
    for (let j=0; j<=uzynlyk; j++){
      let x="pic"+j
      if(pic1[x]!=undefined && allfiles[j]!=undefined){
        fs.unlink("./public/constructor/"+id+"/"+allfiles[j],(err)=>{if(err){console.log(122,err)}})
        allfiles.splice(j,1,newfiles[sana]);
        sana+=1
      }else if(pic1[x]!=undefined &&allfiles[j]==undefined){console.log(155,"shu ishledi");allfiles.push(newfiles[sana]);sana+=1}
      else if(pic1[x]!=undefined &&allfiles[j]==" "){
        for (let k=j;k>0;k--){if(allfiles[k]!=" "){allfiles.splice(k,1,newfiles[sana]);sana+=1;break}}
      }
}

    try {
        await Constructor.update({pic:allfiles},{where:{id:id}})
        return res.status(200).json({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).json({status:"Something went wrong"})
    }
}
exports.addVideo=async(req,res,next)=>{
    let id=req.query.id
    let filename
    let allfiles=[]
    let newfiles=[]
    try {
        filename=await Constructor.findOne({where:{id:id}})
        if(filename.pic!=null){
        allfiles=filename.pic
        }
    }catch (err) {
        console.log(err)
        return res.status(400).json({err:"something went wrong"})
    }
    let sana=0

    let pic=Object.values(req.files)
    let pic1=req.files
    for(let i=0; i<pic.length; i++) {
        let filename=randomstring.generate(7)+".mp4"    
        pic[i].mv("./public/constructor/"+id+"/"+filename)
        newfiles.push(filename)}   
    let uzynlyk
    console.log(allfiles.length,newfiles.length)
    if(allfiles.length==0 || allfiles.length==undefined){uzynlyk=1}else{uzynlyk=allfiles.length}
    if(allfiles.length!=0 &&allfiles.length<newfiles.length){console.log(156);uzynlyk=pic.length}
    console.log(uzynlyk)
    console.log(allfiles,newfiles)
    for (let j=0; j<=uzynlyk; j++){
      let x="pic"+j
      if(pic1[x]!=undefined && allfiles[j]!=undefined){
        fs.unlink("./public/constructor/"+id+"/"+allfiles[j],(err)=>{if(err){console.log(122,err)}})
        allfiles.splice(j,1,newfiles[sana]);
        sana+=1
      }else if(pic1[x]!=undefined &&allfiles[j]==undefined){console.log(155,"shu ishledi");allfiles.push(newfiles[sana]);sana+=1}
      else if(pic1[x]!=undefined &&allfiles[j]==" "){
        for (let k=j;k>0;k--){if(allfiles[k]!=" "){allfiles.splice(k,1,newfiles[sana]);sana+=1;break}}
      }
}
    try {
        await Constructor.update({pic:allfiles},{where:{id:id}})
        return res.status(200).json({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).json({status:"Something went wrong"})
    }
}

