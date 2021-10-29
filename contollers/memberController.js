const{Member}=require("../models")
const sharp=require("sharp")
const fs=require("fs")
const rimraf=require("rimraf")
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
exports.addMember=async (req,res,next)=>{
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
    fs.mkdirSync("./public/members/"+name)
    fs.mkdirSync("./public/members/"+name+"/logo")
    fs.mkdirSync("./public/members/"+name+"/docs")
    docs.forEach(e=>{
        filename=Math.floor(Math.random()*100)+e.name
        e.mv("./public/mysal/"+filename,function(err){if(err){console.log(err)}})
        docname.push(filename)
    })
    let logoname=Math.floor(Math.random()*100)+pic.name
    pic.mv("./public/mysal/"+logoname,(err)=>{if(err){console.log(err)}})
    try{
        let member=await Member.create({name:name,link:link,pic:logoname,files:docname,category:members,email:email,welayat:welayat,body:body,extra:extra,main:main})
        await sharp("./public/mysal/"+logoname,).toFile("./public/members/"+name+"/logo/"+logoname)
        return res.json(member)
    }catch(err){
        console.log(err)
        rimraf("./public/members/"+name,()=>{console.log("done")})
        return res.status(500).json({err:"something went wrong"})
    }
}