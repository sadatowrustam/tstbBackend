const {Commerce,CommerceCategory}=require("../models")
const fs=require("fs")
const sharp = require("sharp")
const randomstring = require("randomstring")

exports.getMain=async(req,res,next)=>{
    let category=req.query.category
    let welayat=req.query.welayat
    try {
        let commerce=await Commerce.findAll({
            where:{welayat:welayat,category:category}
        })
        return res.send(commerce)
    } catch (err) {
        console.log(err);
        return res.status(500).send("something went wrong")
    }
}
exports.getAll=async(req,res,next)=>{
    try {
        let commerce=await Commerce.findAll({include:"category"})
        return res.send(commerce)
    } catch (err) {
        console.log(err);
        return res.status(500).send("something went wrong")
    }
}
exports.addCommerce=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let commerceId=req.body.commerceId
    let welayat=req.body.welayat
    let pic1=req.files.pic
    console.log(pic1.name)
    let category=req.body.category
    let website=req.body.web
    let pic=[]
    if(pic1.length==undefined){
        pic.push(pic1)
    }else{
        pic=pic1
        pic1=[]
    }
    let surat=[]
    pic.forEach(e => {
        let format="."+e.name.split(".")[1]
        let filename=randomstring.generate(7)+format
        surat.push(filename)
        e.mv("./public/mysal/"+filename)
    });
    let number=req.body.number
    try {
        let commerce=await Commerce.create({name:name,welayat:welayat,pic:surat,number:number,category:category,website:website,commerceId:commerceId})
        fs.mkdir("./public/commerce/"+req.body.tm,(err)=>{if(err){console.log(err);}})
        for (let i=0;i<surat.length;i++){
            await sharp("./public/mysal/"+surat[i]).resize(570,210).toFile("./public/commerce/"+req.body.tm+"/"+surat[i])
        }
        return res.send(commerce)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOne=async(req,res,next)=>{
    let id=req.query.id
    try {
        let commerce=await Commerce.findOne({where:{"id":id}})
        return res.send(commerce) 
    } catch (err) {
        console.log(err);
        return res.status(500).send("something went wrong")
    }
}
exports.editCommmerce=async(req,res,next)=>{
    let commerceId=req.body.commerceId;
    let id=req.query.id
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let pic1
    let pic=[]
    let welayat=req.body.welayat
    let category=req.body.category
    let website=req.body.web
    let number=req.body.number
    if(req.files!=null){
        pic1=req.files.pic
    }
    try {
        let commerce=await Commerce.findOne({where:{id:id},attributes:["pic","name"]})
        if (commerce.name.TM!=req.body.tm){
            console.log("menzesh dal")
            fs.rename("./public/commerce/"+commerce.name.TM,"./public/commerce/"+req.body.tm,(err)=>{if(err){console.log(err)}})
        }
        pic=commerce.pic
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
    let startPosition=pic.length
    if (pic1!=undefined){
        if(pic1.length==undefined){
            let format="."+pic1.name.split(".")[1]
            let filename=randomstring.generate(7)+format
            pic1.mv("./public/mysal/"+filename,(err)=>{if(err){console.log(err)}})
            pic.push(filename)
        }else{
            pic1.forEach(e=>{
                let format="."+pic1.name.split(".")[1]
                let filename=randomstring.generate(7)+format
                pic1.mv("./public/mysal/"+filename,(err)=>{if(err){console.log(err)}})
                pic.push(filename)
            })
        }
    }
    console.log(pic)
    try {
        let commerce=await Commerce.update({name:name,welayat:welayat,pic:pic,number:number,commerceId:commerceId,website:website},{where:{"id":id}})
        if (pic1!=undefined){
            if(pic1.length==undefined){
                await sharp("./public/mysal/"+pic[pic.length-1]).toFile("./public/commerce/"+req.body.tm+"/"+pic[pic.length-1])
            }else{
                for(let i=startPosition;i<pic.length;i++){
                await sharp("./public/mysal/"+pic[i]).toFile("./commerce/"+req.body.tm+"/"+pic[i])
                }
            }
        }
        return res.send(commerce)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong129")
    }
    
}
exports.deleteCommerce=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Commerce.destroy({where:{"id":id}})
        return res.send("success")
    } catch (err) {
        console.log(err)
        return res.send("something went wrong")
    }
}
exports.deletePic=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    let commerce
    try {
        commerce=await Commerce.findOne({where: {id:id}})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
    let pics=commerce.pic
    let name=commerce.name.TM
    let cut=pics.splice(index,1)
    console.log(cut,pics)
    try {
        await Commerce.update({pic:pics},{where:{"id":id}})
        fs.unlink("./public/commerce/"+name+"/"+cut,(err)=>{if(err){console.log(err)}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")        
    }
}
exports.addCategory=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    try {
        let commerce=await CommerceCategory.create({name:name})
        return res.send(commerce)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getCategory =async(req,res,next)=>{
    try {
        let commerce=await CommerceCategory.findAll({include:"commerce"})
        return res.send(commerce)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
        
    }
}
exports.deleteCategory =async(req,res,next)=>{
    let id=req.query.id
    try {
        await CommerceCategory.destroy({where:{id:id}})
        return res.send("success")
    } catch (err) {
        console.log(err)
        return res.send(500).send("something went wrong")
    }
}
