const {Constructor,Constructorcategory}=require("../models")
const randomstring = require("randomstring")
const fs=require("fs")
const sharp= require("sharp")
exports.addConstructor=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    try {
        let constructor=await Constructorcategory.create({name:name})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.allConstructors=async(req,res,next)=>{
    try {
        let constructor=await Constructorcategory.findAll({order: [["id","DESC"]],include:["constructors"]})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOneConstructor=async(req,res,next)=>{
    let id=req.query.id
    try {
        let constructor=await Constructorcategory.findOne({where:{"id":id}})
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
        let constructor=await Constructorcategory.update({name:name,where:{id:id}})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.deleteConstructor=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Constructorcategory.destroy({where:{id:id}})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.addSubcategory=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let body={
        TM:req.body.tmbody,
        RU:req.body.rubody,
        EN:req.body.enbody
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
    let id=req.query.id
    try {
        let category = await Constructor.findOne({where:{id:id},include:["category","banner"]})
        return res.send(category)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSubcategory=async(req,res,next) => {
    let files 
    let allfiles=[]
    let id=req.query.id
  try {
    files=await Constructor.findOne({where:{id:id}})
    allfiles=files.pic
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
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
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
      for(let i=0;i<bosh.length;i++){
        fs.unlink("./public/constructor/"+id+"/"+files.pic[(bosh[i]-i)],(err)=>{if(err){console.log(err)}})
        allfiles.splice((bosh[i]-i),1," ")
      }
    }
    try {
        await Constructor.update({header:header,name:name,body:body,bannerId:banner,constructorId:category,page:shablon},{where:{id:id}})
        return res.send("success")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
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
    surat.push(filename)
    newfiles.push(filename)}   
    
    let uzynlyk
    console.log(allfiles.length,newfiles.length)
    if(allfiles.length==0 || allfiles.length==undefined){uzynlyk=1}else{uzynlyk=allfiles.length}
    if(allfiles.length!=0 &&allfiles.length<newfiles.length){console.log(156);uzynlyk=pic.length}
    console.log(uzynlyk)
    for (let j=0; j<=uzynlyk; j++){
      let x="pic"+j
      if(pic1[x]!=undefined && allfiles[j]!=undefined){
        console.log(151,x)
        fs.unlink("./public/menu/"+id+"/"+allfiles[j],(err)=>{if(err){console.log(122,err)}})
        allfiles.splice(j,1,newfiles[sana]);
        sana+=1
      }else if(pic1[x]!=undefined &&allfiles[j]==undefined){console.log(155,"shu ishledi");allfiles.push(newfiles[sana]);sana+=1}
      else if(pic1[x]!=undefined &&allfiles[j]==" "){
        for (let k=j;k>0;k--){if(allfiles[k]!=" "){allfiles.splice(k,1,newfiles[sana]);sana+=1;break}}
      }
}
}


