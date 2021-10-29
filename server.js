const {sequelize}=require("./models")
const express=require("express")
const fileupload=require("express-fileupload")
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileupload())
const cors=require("cors")



app.use(cors({
    origin:"*"
}))
app.use(express.static("./public"))
app.use(require("morgan")("dev"))
app.use("/",require("./routes/public/main"))
app.use("/news",require("./routes/public/news"))
app.use("/newspapers",require("./routes/public/newspaper"))
app.use("/banners",require("./routes/public/banner"))
app.use("/members",require("./routes/public/members"))
app.use("/province",require("./routes/public/province"))
app.use("/sponsor",require("./routes/public/sponsor"))
app.use("/events",require("./routes/public/events"))
app.use("/industry",require("./routes/public/industry"))
app.use("/login",require("./routes/public/login"))
app.use("/commerce",require("./routes/public/commerce"))
app.listen("5000",async function(){
    console.log("app is listening on 5000")
    await sequelize.authenticate()
    console.log("database connected")
})
// app.get("/news",function(req,res){
//     let page=req.query.page
//     if(page==1){
//         axios.get("10.10.15.122:5000/news?limit=18")
//     }else{
//         axios.get("10.10.15.122:5000/careler?limit=18")
//     }
//     if(page==1){
//         axios.get("10.10.15.122:5000/news/loadMore?limit=9&page=2")
//     }else{
//         axios.get("10.10.15.122:5000/careler/loadMore?limit=9&page=2")
//     }
// })
