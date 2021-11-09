const{Industry}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
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
    let pic=req.files.pic
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
    let oldSub=[]
    let filename=Math.floor(Math.random()*100)+pic.name
    let id=req.query.id
    pic.mv("./public/mysal/"+filename,function(err){if(err){console.log(err)}})
    try {
        let subcategory=await Industry.findOne({where:{"id":id}})
        if (subcategory.sub!=null) {
            subcategory.sub.forEach(e=>{
                oldSub.push(e)
            })
        }
        let obj={
            name:name,
            img:filename,
            text:text,
            title:title
        }
        oldSub.push(obj)
        subcategory=await Industry.update({sub:oldSub},{where:{"id":id}})
        await sharp("./public/mysal/"+filename).toFile("./public/industry/"+filename)
        return res.send(subcategory)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSubcategory=async(req,res,next)=>{
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
    let filename
    let id=req.query.id
    let index=req.query.index
    if(req.files!=undefined){
        let pic=req.files.pic
        filename=Math.floor(Math.random()*100)+pic.name
        pic.mv("./public/mysal/"+filename,function(err){if(err){console.log(err)}})
    }
    let obj={
        name:name,
        img:filename,
        text:text,
        title:title
    }
    let newSub=[]
    try {
        let sub=await Industry.findOne({where:{"id":id}})
        if(sub.sub!=null){
            sub.sub.forEach(e=>{
                newSub.push(e)
            })
        }
        if(req.files!=undefined){
            let filename1=sub.sub[index].img
            fs.unlink("./public/industry/"+filename1)
            await sharp("./public/mysal/"+filename).toFile("./public/industry/"+filename)}
        else{obj.img=sub.sub[index].img}
        newSub.splice(index,1,obj)
        await Industry.update({sub:newSub},{where:{"id":id}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
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