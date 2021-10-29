const {Banners,News,Member,Province,Sponsor,Events,Industry}=require("../models")


exports.getAll=async(req,res,next)=>{
  let obj={}
      try{
        let news=await News.findAll({
          order:[
            ["id","DESC"]
          ],
          attributes:["name","title","pic","date","id"],
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
          attributes:["name","title","pic","date","id"],
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
              ["id","ASC"]
          ],
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
            where:{"main":"true"},
            attributes:["id","pic","name"]
          })
          obj.brands=members;
    }catch(err){
      console.log(err)
      return res.json({"err":"something went wrong"})
  }
  try{
    let sponsor=await Sponsor.findAll({
        where:{"srok":"true"}
      })
      obj.sponserler=sponsor
}catch(err){
    console.log(err)
    return res.status(500).send("something went wrong")
}

try{
  let province=await Province.findAll({
    attributes:["id","place","faks","adress","email","phone"]
  })
  obj.location=province
}catch(err){
  console.log(err)
  return res.status(500).send("something went wrong")
}
obj.statictika=["gowrak 12313","gowrak 223","12 yyl bile","80300 gowrak"]
  return res.send(obj)
}
