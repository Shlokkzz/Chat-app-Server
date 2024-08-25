const express = require('express')
const socket = require('socket.io')
const app = express()
// ✅
// ❌
const cors = require('cors')
const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json()); 

const server = app.listen('3001',()=>{
    console.log("Server running on port 3001... ✅");
})

io = socket(server,{
    cors: {
        origin: "http://localhost:3000",  // Allow connection from frontend
        methods: ["GET", "POST"],
        credentials: true
    }
})

io.on('connection',(socket)=>{
    console.log('✅ New socket id'+ socket.id + " ✅");
    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log("User JOINED Room: "+ data +" ✅");
    })

    socket.on('disconnect',()=>{
        console.log("User DISCONNECTED ❌");
    })
})