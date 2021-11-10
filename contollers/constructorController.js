const {Constructor,Constructorcategory}=require("../models")
exports.allConstructors=async(req,res,next)=>{
    try {
        let constructor=await Constructorcategory.findAll({order: [["id","DESC"]]})
        return res.send(constructor)
    } catch (err) {
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
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
exports.addSubcategory=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let category=req.body.category
    let shablon=req.body.shablon
    let banner=req.body.banner   
}
function toArray(array){
    if(array.length!=undefined){
        return [array]
    }else {return array}
}