const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const {
    addNewUser
} = require('./helper/userHelper')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname,'public')))

io.on('connection',socket => {
    socket.on('joinRoom',()=>{
        
    })
})
