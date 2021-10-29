const {Sponsor}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
exports.getSponsers=async(req,res,next)=>{
    try{
        let sponsor=await Sponsor.findAll({
            where:{"srok":"true"}
        })
        return res.send(sponsor) 
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.addSponser=async(req,res,next)=>{
    let name=req.body.name
    let srok=true
    let link=req.body.link
    let pic=req.files.pic
    let filename=Math.floor(Math.random()*100)+pic.name
    pic.mv("./public/mysal/"+filename,(err)=>{if(err){console.log(err);}})
    try{
        let sponser=await Sponsor.create({brandname:name,brandlogo:filename,srok:srok,link:link})
        await sharp("./public/mysal/"+filename).resize(70,70).toFile("./public/sponsers/"+filename)
        return res.send(sponser)
    }
catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.getOne=async(req,res,next)=>{
    let uuid=req.query.uuid
    try{
        let sponser=await Sponsor.findOne({where:{"uuid":uuid}})
        return res.send(sponser)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editSponsor=async(req,res,next)=>{
    let uuid=req.query.uuid
    let name=req.body.name
    let srok=req.body.srok
    let link=req.body.link
    let filename
    try{
        let file=await Sponsor.findOne({where:{"uuid":uuid}})
        filename=file.brandlogo
    }catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    } 
    if(req.files!=undefined){   
        fs.unlink("./public/sponsers/"+filename,(err)=>{
            if(err){console.log(err)}
        })    
        filename=Math.floor(Math.random()*100)+req.files.pic.name
        req.files.pic.mv("./public/mysal/"+filename,(err)=>{if(err){console.log(err)}})
    }
    try {
        let sponsor=await Sponsor.update({brandlogo:filename,brandname:name,srok:srok,link:link},{where:{"uuid":uuid}})
        if(req.files!=undefined){
            await sharp("./public/mysal/"+filename).resize(70,70).toFile("./public/sponsers/"+filename)
        }
        return res.send(sponsor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("somthing went wrong")
    }
}
exports.deleteSponsor=async(req,res,next)=>{
    let uuid=req.query.uuid
    try{
        await Sponsor.destroy({where:{"uuid":uuid}})
        return res.send("success")
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}