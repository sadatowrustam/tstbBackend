const {Banners,News,Member,Province,Sponsor,Events,Industry,Constructorcategory}=require("../models")
const {Op}=require("sequelize")
exports.getAll=async(req,res,next)=>{
  let obj={}
      try{
        let news=await News.findAll({
          order:[
            ["id","DESC"]
          ],
          attributes:["name","pic","date","id","header","body"],
          limit:4,
        })
        obj.list=news
      }catch(err){
        console.log(err)
        return res.status(500).send({err:"err"})
      }
      try{
        let news=await Events.findAll({
          order:[
            ["id","DESC"]
          ],
          attributes:["name","body","pic","date","id","header"],
          limit:4,
        })
        obj.list2=news
      }catch(err){
        console.log(err)
        return res.status(500).send({err:"err"})
      }
      try{
          let banners=await Banners.findAll({
              order:[
                  ["id","ASC"]
              ],
              attributes:["banner","id"]
          })
          obj.banner=banners
      }catch(err){
          console.log(err)
          return res.status(500).json({"err":"something went wrong"})
      }
      try {
        let banners=await Industry.findAll({
          order:[
              ["id","DESC"]
          ],
          where:{sub:{[Op.not]: null}},
          attributes:["id","name"]
      })
      obj.karhanalar=banners
        
      } catch (err) {
        
      }
      try{
        let members=await Member.findAll({
            order:[
                ['id',"DESC"]
            ],
            attributes:["id","pic","name"]
          })
          obj.brands=members;
    }catch(err){
      console.log(err)
      return res.json({"err":"something went wrong"})
  }
  try{
    let sponsor=await Sponsor.findAll({
        where:{"active":"true"}
      })
      obj.sponserler=sponsor
}catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
}
try {
  let category=await Constructorcategory.findAll({order:[["id","DESC"]]})
  obj.category=category
} catch (err) {
  
}
try{
  let province=await Province.findOne({
    attributes:["id","place"]
  })
  obj.location=province
}catch(err){
  console.log(err)
  return res.status(500).send("something went wrong")
}
obj.statictika=["gowrak 12313","gowrak 223","12 yyl bile","80300 gowrak"]
  return res.send(obj)
}
