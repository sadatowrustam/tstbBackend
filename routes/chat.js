const express=require("express");
const {Chat}=require("../models")
const io=require("socket.io")("3000",{cors:{origin:"*"}})
const router=express.Router()
let users = {}
let socket1
io.on('connection',async(socket) => {
    console.log("connection")
    try {
        users=await Chat.findAll()
    } catch (err) {
        console.log(err) 
    }
    socket.on('new-user', async(name) => {
        users[socket.id] = name
        if (socket1==undefined){socket1=socket.id}
        try {
            // await Chat.create({user:id}) 
            socket.broadcast.emit('user-connected', name)
        } catch (err) {
            console.log(err)
        }
    })
    socket.on('send-chat-message', async(id,message) => {
        socket.broadcast.to(users[socket.id]).emit('chat-message', { message: message, name: users[socket.id] })
    })
//     socket.on('disconnect', () => {
//     socket.broadcast.emit('user-disconnected', users[socket.id])
//     delete users[socket.id]
//   })
})
module.exports=router