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
const io=require("socket.io")("3000",{cors:{origin:"*"}})
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

// const users = {}
// let socket1
// io.on('connection', socket => {
//     socket.on('new-user', name => {
//     if (socket1==undefined){socket1=socket.id}
//     users[socket.id] = name
//     socket.broadcast.emit('user-connected', name)
//     console.log(users)
//     })
//     socket.on('send-chat-message', message => {
//     socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
//     })
//     socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//   })
// })
app.listen("5000",async function(){
    await sequelize.authenticate()
    console.log("app is listening on 5000")

})


