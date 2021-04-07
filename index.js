var express = require('express')
var app = express();
var https = require("http").createServer(app).listen(process.env.PORT || 3000)

var io = require("socket.io").listen(https);

var car=[]

app.get("/",(req, res)=>{
    res.send("hello")
})

io.on('connection',(socket)=>{
    console.log(socket.id);
    socket.on('send_position',(data)=>{
        socket.broadcast.emit('sv_send_position',data)
    })
    socket.on('regis',(data)=>{
        socket.car_infor = data
        car.push(socket)
    })
})
