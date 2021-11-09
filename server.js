const {sequelize}=require("./models")
const express=require("express")
const fileupload=require("express-fileupload")
const app=express()
const fs=require("fs")
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
    await sequelize.authenticate()
    console.log("app is listening on 5000")

})


