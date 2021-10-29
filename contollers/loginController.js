const {Login}=require("../models")
const bcrypt=require("bcrypt")
exports.setting=async(req,res,next)=>{
    
    try {
        let password
        let login=await Login.findOne()
        if(login!=null){
            return res.send("setting edildi")
        }else{
            password=bcrypt.hashSync("admin",10)
            console.log(password)
            login=await Login.create({"name":"admin","password":password})
            return res.send(login)
        }
    } catch (err) {
        console.log(err)
        return res.send("error")
    }
}
exports.login=async(req,res,next)=>{
    let name=req.body.name
    let password=req.body.password
    try {
        let admin=await Login.findOne()
        if(admin.name==name){
            bcrypt.compare(password,admin.password,function(err,result){
                if(result==true){
                    return res.send("success")
                }else{
                    return res.send("adynyz yada parolynyz yalnysh")
                }
            })
        }else{return res.send("adynyz yada parolynyz yalnysh")}
    } catch (err) {
        console.log(err)
        return res.status(500).send("error")
    }
}