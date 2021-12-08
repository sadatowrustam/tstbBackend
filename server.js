const {sequelize}=require("./models")
const express=require("express")
const fileupload=require("express-fileupload")
const app=express()
const http=require("http")
const fs=require("fs")
app.use(express.json())
const{dayControl}=require("./utils/dayControl")
app.use(express.urlencoded({extended:true}))
app.use(fileupload())
const cors=require("cors")
app.use(cors({
    origin:"*",
    credentials:true,
    
}))
// http.get("http://localhost:5000/banners/2L9CECF.png",(res)=>{
//     let filename=fs.createWriteStream("./public/test.png")
//     res.pipe(filename)
//     filename.on("finish",()=>{
//         console.log("done")
//         filename.close()
//     })
// })

app.use(dayControl)
app.use(express.static("./public"))
app.use(require("morgan")("dev"))
app.use("/",require("./routes/main"))
app.use("/news",require("./routes/news"))//dyndyk
app.use("/newspapers",require("./routes/newspaper"))//dyndyk
app.use("/banners",require("./routes/banner"))//dyndyk
app.use("/members",require("./routes/members"))//dyndyk
app.use("/province",require("./routes/province"))//dyndyk
app.use("/sponsor",require("./routes/sponsor"))
app.use("/events",require("./routes/events"))//dyndyk
app.use("/industry",require("./routes/industry"))
app.use("/commerce",require("./routes/commerce"))//dyndyk
app.use("/constructor",require("./routes/constructor"))
app.use("/mail",require("./routes/mail"))//dyndyk
// app.use("/chat",require("./routes/chat"))
app.use("/menu",require("./routes/menu"))//dyndyk
app.use("/login",require("./routes/login"))
app.listen("5000",async function(){
    await sequelize.authenticate()
    console.log("app is listening on 5000")

})


