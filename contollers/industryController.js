const{Industry}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
const randomstring = require("randomstring")
exports.getMain=async(req,res,next)=>{
    try{
        let industry=await Industry.findAll({
            attributes:["id","name","sub"]
        })
        return res.send(industry)
    }catch(err){
        console.log(err)
        return res.send("error")
    }
}
exports.getOneIndsutry=async(req,res,next)=>{
    let id=req.query.id
    try{
        let industry=await Industry.findOne({where:{"id":id}})
        return res.send(industry)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editIndustry=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let id=req.query.id
    try {
        let industry=await Industry.update({name:name},{where:{"id":id}})
        return res.send(industry)
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    } 
}
exports. deleteIndustry=async(req,res,next)=>{
    let id=req.query.id
    try{
        let industry=await Industry.destroy({where:{"id":id}})
        return res.send(industry)
    }catch(err){
        console.log(err)
        return res.status(500).send("error")
    }
}
exports.addIndustry=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    try {
        let industry=await Industry.create({name:name})
        return res.send(industry)
    } catch (error) {
        console.log(error)
        return res.status(500).send("something went wrong")
    }
}
exports.getOneSubcategory=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    try{
        let sub=await Industry.findOne({attributes:["sub"]},{where:{"id":id}})
        return res.send(sub.sub[index])
    }catch(err){
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
    let text={
        TM:req.body.text,
        RU:req.body.text2,
        EN:req.body.text3
    }
    let title={
        TM:req.body.headerTM,
        RU:req.body.headerRU,
        EN:req.body.headerEN
    }
    let id=req.query.id
    let oldSub=[]
    try {
        let subcategory=await Industry.findOne({where:{"id":id}})
        if (subcategory.sub!=null) {
            subcategory.sub.forEach(e=>{
                oldSub.push(e)
            })
        }
        let obj={
            name:name,
            img:"",
            text:text,
            title:title
        }
        let index=oldSub.length
        oldSub.push(obj)
        subcategory=await Industry.update({sub:oldSub},{where:{"id":id}})

        return res.send({id:Number(id),index:index})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSubcategory=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index

    let sub
    let files
    try {
        sub=await Industry.findOne({where:{"id":id}})
        console.log(sub.sub)
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"something went wrong"})
    }
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let text={
        TM:req.body.tmtext,
        RU:req.body.rutext,
        EN:req.body.entext
    }
    let title={
        TM:req.body.tmtitle,
        RU:req.body.rutitle,
        EN:req.body.entitle
    }
    let obj={
        name:name,
        img:files,//suratlar db den cekilen
        text:text,
        title:title
    }
    try {
        sub.sub.splice(index,1,obj)
        await Industry.update({sub:sub.sub},{where:{"id":id}})
        return res.status(200).send({id:id})
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }
}
exports.deleteSubcategory=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    let sub
    try {
        sub=await Industry.findOne({where:{"id":id}})
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")        
    }
    sub.sub.splice(index,1)
    console.log(sub.sub);
    try {
        await Industry.update({sub:sub.sub},{where:{"id":id}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }

}
exports.addPic=async(req,res,next)=>{
    let id=req.query.id
    let index=req.query.index
    let files
    try {
        files=await Industry.findOne({where:{id:id}})
        if(files.sub!=null){
            files=files.sub
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send("something went wrong")
    }

    try {
        let file=req.files.pic0
        let filename=randomstring.generate(7)+".webp"
        let buffer=await sharp(file.data).webp({quality:90}).toBuffer()
        await sharp(buffer).toFile("./public/industry/"+filename)
        if(files[index].img!=null){
            fs.unlink("./public/industry/"+files[index].pic,(err) => {if(err){console.log(err)}})
        }
        files[index].pic=filename
        await Industry.update({sub:files},{where:{"id":id}})  
        return res.status(200).send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"Yalnyshlyk cykdy gaytadan yuklap gorun"})
    }

}