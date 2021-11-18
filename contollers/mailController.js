const {Mail}=require("../models")

exports.addUser=async(req,res,next)=>{
    let mail=req.body.mail
    try {
        let user=await Mail.create({mail:mail})
        return res.send(user)
    } catch (err) {
        console.log(err)
        return res.send("something went wrong")
    }
}
