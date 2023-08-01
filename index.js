const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const app = express()
const {newUser,getUsersOfRoom,getActiveUsers, exitRoom} = require('./helper/userHelper')
const messageFormatter = require('./helper/messageHelper')
const server = http.createServer(app)
const io = socketio(server)
app.use(express.static(path.join(__dirname,'public')))

io.on('connection', socket => {
    socket.on('joinRoom',({username,room})=>{
        const user = newUser(socket.id,username,room)
        console.log('newuser',user,getUsersOfRoom(user.room))
        socket.join(user.room)

        socket.emit('message',messageFormatter('admin','Messages are limited to this chat. Please be respectful towards other users'))

        socket.broadcast.emit('message',messageFormatter('admin',`${user.username} has joined the room`))
        //console.log('activeUsers',getUsersOfRoom(user.room))
        io.to(socket.id).emit('roomUser',{
            room: user.room,
            users: getUsersOfRoom(user.room)
        })
    })
    socket.on('chatMsg',(msg)=>{
        console.log('chatmsg',msg)
    const user = getActiveUsers(socket.id)
    io.to(user.room).emit('message',messageFormatter(user.username,msg))
    })

    socket.on('disconnect',()=>{
        const user = exitRoom(socket.id)
        console.log('user',user)
        io.to(user.room).emit('message', messageFormatter('admin',`${user.username} has left the room`))
        io.to(user.room).emit('roomUser',{
            room: user.room,
            users: getUsersOfRoom(user.room)
        })
    })
})



const PORT = 3000

server.listen(PORT,()=> console.log('server running on' + PORT))