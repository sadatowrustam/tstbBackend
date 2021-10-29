const {Commerce}=require("../models")

exports.getMain=async(req,res,next)=>{
    return res.send("main")
}
exports.addCommerce=async(req,res,next)=>{
    let name={
        TM:req.body.tm,
        RU:req.body.ru,
        EN:req.body.en
    }
    let welayat=req.body.welayat
    let pic=req.files.pic
    let number=req.body.number

}