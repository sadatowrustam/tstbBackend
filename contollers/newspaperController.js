const {Newspaper}=require("../models")
const fs=require("fs")
exports.getAllNewspapers=async(req,res,next)=>{
    try{
        let newspaper=await Newspaper.findAll()
        return res.json(newspaper)
    }catch(err){
        console.log(err)
        return res.json({"err":"something went wrong"})
    }
}
exports.addNewspaper=async(req,res,next)=>{
    let file=req.files.file
    let filename=Math.floor(Math.random()*100)+file.name
    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let date=req.body.date
    try{
        const newspaper=await Newspaper.create({name,filename,date})
        file.mv("./public/newspapers/"+filename,function(err){
            if(err){
                console.log(err)
            }
        })
        return res.json(newspaper)
    }catch(err){
        console.log(err)
        return res.json({"err":err})
    }
}
exports.getOneNewspaper=async(req,res,next)=>{
    let uuid=req.query.uuid
        try{
            let paper=await Newspaper.findOne({where:{"uuid":uuid}})
            return res.send(paper)
        }catch(err){
            console.log(err)
            return res.status(500).send("something went wrong")
        }
}
exports.editNewspaper=async(req,res,next)=>{
    let uuid=req.query.uuid
    let filename
        try{
            let paper=await Newspaper.findOne({where:{"uuid":uuid}})
            filename=paper.filename
        }catch(err){
            console.log(err)
            return res.status(500).send("something went wrong")
        }
    
    if(req.files!=undefined){
        let file=req.files.file
        fs.unlink("./public/newspapers/"+filename,(err)=>{
            if(err){console.log(err)}
        })
        filename=Math.floor(Math.random()*100)+file.name
        file.mv("./public/newspapers/"+filename,function(err){if(err){console.log(err);}})
    }
    let name={
        tm:req.body.tm,
        ru:req.body.ru,
        en:req.body.en
    }
    let date=req.body.date
    try {
        let newspaper=await Newspaper.update({name:name,date:date,filename:filename},{where:{"uuid":uuid}})
        return res.send(newspaper)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.deleteNewspaper=async(req,res,next)=>{
    let uuid=req.query.uuid
    let filename
    try{
        let file=await Newspaper.findOne({where:{"uuid":uuid}})
        filename=file.filename
    }catch(err){}
    try {
        await Newspaper.destroy({where:{"uuid":uuid}})
        fs.unlink("./public/newspapers/"+filename,(err)=>{if(err){console.log(err)}})
        return res.send("success")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
