const {Menu}=require('../models')
exports.addSettings=async(req,res,next)=>{
    try {
        await Menu.create({body:{header:[],body:[]}})//membership
        await Menu.create({body:{body:[]}})//galan zatlaryny object edip goshmaly biznes plan
        await Menu.create({body:{body:[]}})//galan zatlaryny object edip goshmaly lisensiya
        await Menu.create({body:{}})//konsultasiya
        await Menu.create({body:{}})//about us
        return res.send("sucess")
    } catch (err) {
        console.log(err)
    }
}
exports.getMembership=async(req,res,next)=>{
    try {
        let member=await Menu.findOne({where:{id:1}})
    } catch (err) {
        console.log(err)
        return res.status(400).send(err.message)
    }
}
exports.editMembership=async(req,res,next)=>{
    let body={}
    body.header={
        tm:toArray(req.body.text),
        ru:toArray(req.body.text2),
        en:toArray(req.body.text3)
    }
    
    body.body={
        tm:toArray(req.body.tmheader),
        ru:toArray(req.body.ruheader),
        en:toArray(req.body.enheader)
    }
    try {
        await Menu.update({body:body},{where:{"id":1}})
    } catch (err) {
        console.log(err)
        return res.status(400).send({message: err.message})   
    }

}
function toArray(el){
    let array=[]
    if(typeof (el) === 'string'){
        array.push(el)
        return array
    }else{return el}
}