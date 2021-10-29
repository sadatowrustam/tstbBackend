const {Province}=require("../models")

exports.addSettings=async(req,res,next)=>{
    try{
        await Province.create({
            place:{
                TM:"Ahal we Aşgabat",
                RU:"Ахал и Ашхабад",
                EN:"Akhal and Ashgabat"
            }
    })
    await Province.create({
        place:{
            TM:"Mary",
            RU:"Мары",
            EN:"Mary"
        }
    })
    await Province.create({
        place:{
            TM:"Lebap",
            RU:"Лебап",
            EN:"Lebap"
        }
    })
    await Province.create({
        place:{
            TM:"Daşoguz",
            RU:"Дашогуз",
            EN:"Dashoguz"
        }
    })
    await Province.create(
        {place:{
        TM:"Balkan",
        RU:"Балкан",
        EN:"Balkan"}
    })
    return res.send("sucess")
    }catch(err){
        console.log(err)
        return res.send("somthing went wrong")
    }
}
exports.getProvince=async(req,res,next)=>{
    let id=req.query.id
    try{
       let province=await Province.findOne({
           where:{"id":id}
       })
       return res.send(province)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
exports.editProvince=async(req,res,next)=>{
    let id=req.query.id
    let adress={
        TM:req.body.adressTM,
        RU:req.body.adressRU,
        EN:req.body.adressEN
    }
    let phone1=req.body.phone
    let phone=[]
    if(typeof(phone1)=="string"){
        phone.push(phone1)
    }else{phone=phone1}
    let faks1=req.body.faks
    let faks=[]

    if(typeof(faks1)=="string"){
        faks.push(faks1)    
    }else{faks=faks1}
    let email=req.body.email
    console.log(adress,phone,faks,email)
    try{
        let province=await Province.update({
            adress:adress,phone:phone,faks:faks,email:email,
        },
        {where:{id:id}}
        )
        return res.send(province)
    }catch(err){
        console.log(err)
        return res.status(500).send("something went wrong")
    }
}
