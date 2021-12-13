const {Login}=require("../models")
const bcrypt=require("bcrypt")
exports.setting=async(req,res,next)=>{
    try {
        let password
        let login=await Login.findOne()
        if(login!=null){
            return res.send("setting edildi")
        }else{
            password=bcrypt.hashSync("tstbadmin",10)
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
    let password=req.body.pass
    try {
        let admin=await Login.findOne()
        if(admin.name==name){

            bcrypt.compare(password,admin.password,function(err,result){
                if(result==true){
                    return res.send({status:200})
                }else{
                    return res.status(400).send({status:401})
                }
            })
        }else{
            return res.status(400).send({status:400})}
    } catch (err) {
        console.log(err)
        return res.status(400).send("error")
    }
}
exports.update=async(req, res,next)=>{
    let password=req.body.password
    let name=req.body.name
    let login=await Login.findOne()
    try {
        password=bcrypt.hashSync(password,10)
        console.log(password)
        login=await Login.update({"name":name,"password":password},{where:{id:1}})
        return res.send({status:200})
    } catch (err) {
        console.log(err)
        return res.status(400).send({status:400})
    }
    }
