var express = require('express')
var app = express();
var https = require("http").createServer(app).listen(process.env.PORT || 3000)

var io = require("socket.io").listen(https);

var car=[]
var remote=[]

app.get("/",(req, res)=>{
    res.send("hello")
})

io.on('connection',(socket)=>{
    console.log("connected: "+socket.id);
    remote.push(socket)
    socket.on('send_position',(data)=>{
        console.log(data);
        remote.forEach(element => {
            if (element==socket)continue
            element.emit("sv_send_position",data)
        });
    })
    socket.on('regis',(data)=>{
        if(data=="remote"){
            remote.push(socket)
        }
        else{
            socket.car_infor = data
            car.push(socket)
        }
        
    })
    socket.on("disconnect",()=>{
        remote.remove(socket)
    })
})
