const {sequelize}=require("./models")
const express=require("express")
const fileupload=require("express-fileupload")
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileupload())



const cors=require("cors")
app.use(cors({
    origin:"*",
    credentials:true,
    
}))
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
app.use("/mail",require("./routes/public/mail"))//men dyndym
app.use("/chat",require("./routes/public/chat"))
app.use("/menu",require("./routes/public/menu"))//dyndyk

app.listen("5000",async function(){
    await sequelize.authenticate()
    console.log("app is listening on 5000")

})


