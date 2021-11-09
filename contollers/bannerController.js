const {Banners}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
exports.allBanners=async(req,res,next)=>{
    try{
        let banners=await Banners.findAll({
            order:[
                ["id","ASC"]
            ],
            attributes:["id","banner"]
        })
        return res.json(banners)
    }catch(err){
        console.log(err)
        return res.status(500).json({"err":"something went wrong"})
    }
}
exports.addBannersSettings=async(req,res,next)=>{
    try{
        await Banners.create()
        await Banners.create()
        await Banners.create()
        return res.json("sucess")
    }catch(err){
        console.log(err)
        return res.json("smth went wwrong")
    }
}
exports.addBanners=async(req,res,next)=>{
    let id=req.query.id
    let picture=req.files.pic
    let web=req.body.web
    let filename=Math.floor(Math.random()*100)+picture.name
    let banner={
        pic:filename,
        link:web
    }

    let allBanners=[]
    picture.mv("./public/mysal/"+filename,function(err){if(err){console.log(err)}})
    try{
        let banners=await Banners.findOne({where:{id:id}})
        if (banners.banner!=null){
            banners.banner.forEach(e=>{
                allBanners.push(e)
            })
        }
        allBanners.push(banner)
        banners=await Banners.update({banner:allBanners},{where:{id:id}})
        console.log(filename)
        await sharp("./public/mysal/"+filename).resize(1100,234).toFile("./public/banners/"+filename)
        return res.json(banners)
    }catch(err){
        console.log(err)
        return res.json({err:"smth went wrong"})
    }
}
exports.editBanner=async(req,res,next)=>{
    let bannernumb=req.query.numb
    let id=req.query.id
    let web=req.body.web
    let pics=[]
    let all=[]
    let filename
    
    try{
        let banner=await Banners.findOne({
            where:{"id":id},
            attributes:["banner"]
        })
        if(banner.banner.length!=0 || banner.banner.length!=undefined){
            banner.banner.forEach(e=>{
                all.push(e)
            })
        }
        all[bannernumb].link=web
        filename=all[bannernumb].pic
        if(req.files!=undefined){
            fs.unlink("./public/banners/"+filename,(err)=>{if(err){console.log(err);}})
            filename=Math.floor(Math.random()*100)+req.files.image.name
            req.files.image.mv("./public/mysal/"+filename,function(err){if(err){console.log(err)}})
            await sharp("./public/mysal/"+file.name).resize(1100,234).toFile("./public/banners/"+filename)
            all[bannernumb].pic=filename
        }
        await Banners.update({banner:all},{where:{"id":id}})
        return res.send("sucess")
        

    }catch(err){
        console.log(err)
        return res.status(500).json({"err":"smth went wrong"})
    }

}