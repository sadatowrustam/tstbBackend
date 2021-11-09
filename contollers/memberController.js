const{Member}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
const rimraf=require("rimraf")
const randomstring=require("randomstring")

exports.allMembers=async(req,res,next)=>{
    try {
        let members=await Member.findAll()
        return res.send(members)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.mainMembers=async(req,res,next)=>{
    try{
        let members=await Member.findAll({
            order:[
                ['id',"DESC"]
            ],
            where:{"main":"true"},
            attributes:["uuid","pic","name"]
        })
        return res.json(members)
    }catch(err){
        console.log(err)

        return res.json({"err":"something went wrong"})
    }
}
exports.addMember=async(req,res,next)=>{
    let name=req.body.name
    let link=req.body.web
    let pic=req.files.pic
    let doc=req.files.docs
    let member=req.body.membership
    let email=req.body.email
    let body=req.body.body
    let extra=req.body.extra
    let welayat=req.body.welayat
    let main=req.body.main
    let docs=[]
    let docname=[]
    let members=[]
    let filename
    if(typeof(member)=="string"){
        members.push(member)
    }else{
        members=member
    }
    if(doc.length==undefined){
        docs.push(doc)
    }else{
        docs=doc
    }
    fs.mkdir("./public/member/"+name,(err)=>{if(err){console.log(err)}})
    fs.mkdir("./public/member/"+name+"/logo",(err)=>{if(err){console.log(err)}})
    fs.mkdir("./public/member/"+name+"/docs",(err)=>{if(err){console.log(err)}})
    docs.forEach(e=>{
        let format="."+e.name.split(".")[1]
        filename=randomstring.generate(7)+format
        e.mv("./public/member/"+name+"/docs/"+filename,(err)=>{if(err){console.log(err)}})
        docname.push(filename)
    })
    let logoname=randomstring.generate(7)+pic.name
    pic.mv("./public/mysal/"+logoname,(err)=>{if(err){console.log(err)}})
    try{
        let member=await Member.create({name:name,link:link,pic:logoname,files:docname,category:members,email:email,welayat:welayat,body:body,extra:extra,main:main})
        await sharp("./public/mysal/"+logoname,).toFile("./public/member/"+name+"/logo/"+logoname)
        return res.json(member)
    }catch(err){
        console.log(err)
        rimraf("./public/member/"+name,()=>{console.log("done 74")})
        return res.status(500).json({err:"something went wrong"})
    }
}
exports.getOne=async(req,res,next)=>{
    let id=req.query.id
    try {
        let member=await Member.findOne({where:{"id":id}})
        return res.send(member)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editMember = async(req, res,next) => {
    let id=req.query.id
    let name=req.body.name
    let link=req.body.web
    let member=req.body.membership
    let email=req.body.email
    let body=req.body.body
    let extra=req.body.extra
    let welayat=req.body.welayat
    let main=req.body.main
    let docs=[]
    let docname=[]
    let members=[]
    let filename
    let foldername
    let startIndex
    let logoname 
    try {
       let member=await Member.findOne({where:{id:id}})
       foldername=member.name
       docs=member.files
       logo=member.pic
       startIndex=docs.length-1
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
    if(foldername!=name){
        console.log("menzesh dal",foldername,name)
        fs.rename("./public/member/"+foldername,"./public/member/"+name,(err)=>{if(err){console.log(err)}})
    }
    if(typeof(member)=="string"){
        members.push(member)
    }else{
        members=member
    }
    if(req.files!=undefined && req.files.docs!=undefined){
        let doc = req.files.docs
        if(doc.length==undefined){
            let format="."+e.name.split(".")[1]
            let filename=randomstring.generate(7)+format
            doc.mv("./public/member/"+name+"/docs/"+filename,function(err){if(err){console.log(err)}})
            docs.push(filename)
        }else{
            doc.forEach(e=>{
                let format="."+e.name.split(".")[1]
                let filename=randomstring.generate(7)+format
                console.log(filename)
                e.mv("./public/member/"+name+"/docs/"+filename,function(err){if(err){console.log(err)}})
                docs.push(filename)
            })
        }
    }
    if(req.files!=undefined&&req.files.pic!=undefined){
        let format="."+req.files.pic.name.split(".")[1]
        logoname = randomstring.generate(7)+format
        req.files.pic.mv("./public/member/"+name+"/logo/"+logoname,(err)=>{if(err){console.log(err)}})
    }
    try{
        let member=await Member.update({name:name,link:link,pic:logoname,files:docname,category:members,email:email,welayat:welayat,body:body,extra:extra,main:main},{where:{"id":id}})
        return res.json(member)
    }catch(err){
        console.log(err)

        return res.status(500).json({err:"something went wrong"})
    }
}
exports.deleteMember=async(req,res,next)=>{
    let id=req.query.id
    try {
        await Member.destroy({where:{id:id}})
        return res.send("sucess")
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}