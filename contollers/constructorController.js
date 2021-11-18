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
    let TM=toArray(req.body.tmbody)
    let RU=toArray(req.body.rubody)
    let EN=toArray(req.body.enbody)
    let body={
        TM:isEmpty(TM),
        RU:isEmpty(RU),
        EN:isEmpty(EN)
    }
    TM=toArray(req.body.tmheader)
    RU=toArray(req.body.ruheader)
    EN=toArray(req.body.enheader)
    let header={
        TM:isEmpty(TM),
        RU:isEmpty(RU),
        EN:isEmpty(EN)
    }
    let pic=Object.values(req.files)
    let surat=[]
    pic.forEach(e=>{
        surat.push(generateName(e))
    })
    fs.mkdir("./public/constructor/"+req.body.tm,(err)=>{if(err){console.log(err)}})
    uploadPic(pic,surat)
    let category=req.body.category
    let shablon=req.body.shablon 
    let banner=req.body.banner
    try {
        let subcategory=await Constructor.create({header:header,name:name,body:body,bannerId:banner,constructorId:category,page:shablon,pic:surat})
        for(let i=0;i<surat.length;i++){
            await sharp("./public/mysal/"+surat[i]).toFile("./public/constructor/"+req.body.tm+"/"+surat[i])
        }
        return res.send(subcategory)
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
    let picturesDb
    let surat=[]
    let tazeSurat=[]
    let id=req.query.id
    try {
        picturesDb = await Constructor.findOne({where:{id:id},attributes:["pic","name"]})
        surat=picturesDb.pic
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }

    if(req.body.tm!=picturesDb.name.TM){
        fs.rename("./public/constructor/"+picturesDb.name.TM,"./public/constructor/"+req.body.tm,(err)=>{if(err){console.log(err)}})
    }
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let TM=toArray(req.body.tmbody)
    let RU=toArray(req.body.rubody)
    let EN=toArray(req.body.enbody)
    let body={
        TM:isEmpty(TM),
        RU:isEmpty(RU),
        EN:isEmpty(EN)
    }
    TM=toArray(req.body.tmheader)
    RU=toArray(req.body.ruheader)
    EN=toArray(req.body.enheader)
    let header={
        TM:isEmpty(TM),
        RU:isEmpty(RU),
        EN:isEmpty(EN)
    }
    let lens
    if(req.files!=undefined){
        lens=Object.values(req.files)
        if(lens.length==surat.length || lens.length>surat.length){
            for(let i=0;i<surat.length;i++){
                let objectname="pic"+(i+1)
                if(req.files[objectname]!=undefined){
                    let filename=generateName(req.files[objectname])
                    req.files[objectname].mv("./public/mysal/"+filename,(err)=>{if(err){console.log(err)}})
                    fs.unlink("./public/constructor/"+req.body.tm+"/"+surat[i],(err)=>{if(err){console.log(err)}})
                    surat.splice(i,1,filename)
                    tazeSurat.push(filename)
                }
            }
            if(lens.length>surat.length){
                let uzynlyk=surat.length
                for(let i=uzynlyk;i<lens.length;i++){
                    let objectname="pic"+(i+1);
                    let filename=generateName(req.files[objectname])
                    req.files[objectname].mv("./public/mysal/"+filename)
                    surat.push(filename)
                    tazeSurat.push(filename)
                }
            }
    }
        if(lens.length<surat.length){
            for (let i=0;i<surat.length;i++){
                let objectname="pic"+(i+1)
                if(req.files[objectname]!=undefined){
                    let filename=generateName(req.files[objectname])
                    req.files[objectname].mv("./public/mysal/"+filename,(err)=>{if(err){console.log(err)}})
                    fs.unlink("./public/constructor/"+req.body.tm,(err)=>{if(err){console.log(err)}})
                    surat.splice(i,1,filename)
                    tazeSurat.push(filename)
                }
            }
        }    
    }
    let category=req.body.category
    let shablon=req.body.shablon 
    let banner=req.body.banner
    try {
        await Constructor.update({header:header,name:name,body:body,bannerId:banner,constructorId:category,page:shablon,pic:surat},{where:{id:id}})
        if(req.files!=undefined){
            for (let i=0;i<tazeSurat.length;i++){
                await sharp("./public/mysal/"+tazeSurat[i]).toFile("./public/constructor/"+req.body.tm+"/"+tazeSurat[i]);
            }
        }
        return res.send("success")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
function toArray(array){
    let a=[]
    if(array.length==undefined){
        a.push(array)
        return a
    }else {return array}
}
function isEmpty(array){
    let array1=[]
    array.forEach(e=>{
        if (e!=''){array1.push(e)}
    })
    return array1
}
function generateName(e){
    
    let format="."+e.name.split(".")[1]
    return randomstring.generate(7)+format
}
function uploadPic(pic,surat){
    pic.forEach((e,i)=>{
        e.mv("./public/mysal/"+surat[i],(err)=>{if(err){console.log(err)}})
    })
}
