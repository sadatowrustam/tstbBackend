const {sequelize}=require("./models")
const express=require("express")
const fileupload=require("express-fileupload")
const app=express()
const http=require("http")
const fs=require("fs")
app.use(express.json())

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
app.use(express.static("./public"))
app.use(require("morgan")("dev"))
app.use("/",require("./routes/public/main"))
app.use("/news",require("./routes/public/news"))//dyndyk
app.use("/newspapers",require("./routes/public/newspaper"))//dyndyk
app.use("/banners",require("./routes/public/banner"))//dyndyk
app.use("/members",require("./routes/public/members"))//dyndyk
app.use("/province",require("./routes/public/province"))//dyndyk
app.use("/sponsor",require("./routes/public/sponsor"))
app.use("/events",require("./routes/public/events"))//dyndyk
app.use("/industry",require("./routes/public/industry"))
app.use("/commerce",require("./routes/public/commerce"))//dyndyk
app.use("/constructor",require("./routes/public/constructor"))
app.use("/mail",require("./routes/public/mail"))//dyndyk
app.use("/chat",require("./routes/public/chat"))
app.use("/menu",require("./routes/public/menu"))//dyndyk
app.use("/login",require("./routes/public/login"))
app.listen("5000",async function(){
    await sequelize.authenticate()
    console.log("app is listening on 5000")

})


