const express=require("express");
const {Chat}=require("../models")
const io=require("socket.io")("3000",{cors:{origin:"*"}})
const router=express.Router()
let users = {}
let adminOnline = false
let adminSocket
let isNewMessage=false
io.on('connection',async(socket) => {
    socket.on('new-user', async(name) => {
        await Chat.create({user:socket.id})
        socket.emit("new-user-login",{id:socket.id})
    })
    socket.on("login",async(socketId)=>{
        let messages=await Chat.findOne({where:{user:socketId}})
        socket.emit("all-messages",{messages:messages.chat})
    })
    socket.on("admin-login",async()=>{
        adminOnline=true
        adminSocket=socket.id
        if(isNewMessage){
            socket.emit("new-messages")
            isNewMessage=false
        }
    })
    socket.on("admin-get",async()=>{
        adminSocket=socket.id
        let allMessages=await Chat.findAll({attributes:["chat","isRead"]})

        socket.emit('admin-allmessages',{ message: allMessages})
    })
    socket.on("admin-send",async(message,userSocketId)=>{
        let messages=await Chat.findOne({where:{user:userSocketId}})
        if(users[messages.lastId]!=undefined){
            socket.broadcast.to(lastId).emit('chat-message', { message: newMessage})
        }
        let allMessages=messages.chat
        let newMessage={
            who:"admin",
            message:message
        }
        allMessages.push(newMessage)
        await Chat.update({chat:allMessages,where:{user:userSocketId}})
    })
    socket.on('send-chat-message', async(obj) => {
        let allMessages =[]
        let messages=await Chat.findOne({where:{user:obj.id}})
        if(messages.chat!=null){
            allMessages=messages.chat
        }
        let newMessage={
            who:"you",
            message:obj.message
        }

        allMessages.push(newMessage)
        if(adminOnline){
            socket.broadcast.to(adminSocket).emit('chat-message', { message: obj.message})
        }
        await Chat.update({chat:allMessages,lastId:socket.id,isRead:"true"},{where:{user:obj.id}})
        isNewMessage=true

    })
    socket.on('disconnect', () => {
    if(adminSocket==socket.id){
        adminOnline = false
    }
    delete users[socket.id]
  })
})
module.exports=router