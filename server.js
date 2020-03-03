const express = require ('express');
const app = express();
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');
//import models
const Log = require('./models/log');
const Pastmessages = require('./models/messages')

//app.set ('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'client/build')));

//testing
app.get('/express_backend', (req, res) => {
    res.send({ express: 'EXPRESS WORKS!' });
  });

//Routing
app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname , '/client/build/index.html'))
  });

//PORTS
server = app.listen(process.env.PORT || 3000)

//Socket
const chat_io = require("socket.io")(server)

/*
pastmessages = {
    general : [],
    coding : [],
    tech : [],
    off : []};// */
colors = ["#035",
          "#050",
          "#500",
          "#505",
          "#550",
          "#005"]
numuser = 0;


function getPastMessages (room)
{ 
    console.log("hello from get past messages")
    return Pastmessages.find({room : room}, (error, data) => {
        if (error) {
            console.log(error);
            return null
        }
        return data
    });
}




function addMessage(room, msg){
    msg.room = room;
    Pastmessages.create(msg, (error, data) => {
        if (error) {
            console.log(error);
            return
        }
        res.json(data)
    })
    /*
    if (room == 'general')
        pastmessages.general.push(msg)
    else if (room == 'coding')
        pastmessages.coding.push(msg)
    else if (room == 'tech')
        pastmessages.tech.push(msg)
    else if (room == 'off')
        pastmessages.off.push(msg)
        // */
}


//listen to everything
chat_io.on('connection', (socket) => {
    console.log('New user connected')
    //set color
    console.log(numuser)
    socket.color = colors[numuser]
    numuser++;
    numuser = numuser%colors.length;
    socket.room = 'general'
    socket.join('general')
    
    getPastMessages('general').then((pastmsg) =>{
        console.log("emit past messages: ", pastmsg)
        for (message in pastmsg){
            console.log("emit past msg : ", message)
            socket.emit ("new_message",
                {message : pastmsg[message].message, username : pastmsg[message].username, color : pastmsg[message].color}
            )
        }
        })

    //defalt name
    socket.username = "Anonymouse"

    //listen to change name
    socket.on ("change_username", (data) => {
        console.log(data.username)
        socket.username = data.username;
    })

    //listen for room change
    socket.on ("switch_room", (data) => {
        socket.leave(socket.room)
        socket.room = data.room
        socket.join(data.room)
 
        //chat_io.sockets.emit("new_message", {message : "switching to room " + data.room,  username : socket.username, color : socket.color})

        getPastMessages(data.room).then((pastmsg) =>{
            for (message in pastmsg){
                socket.emit ("new_message",
                {message : pastmsg[message].message, username : pastmsg[message].username, color : pastmsg[message].color}
                )
            }
        });// */
    })

    //listen to new message
    socket.on("new_message", (data) => {
        message = {message : data.message, username : socket.username, color : socket.color};
        addMessage(socket.room, message)
        chat_io.sockets.to(socket.room).emit ("new_message", message);
    })
})

chat_io.on('disconnect', function (data){
    console.log ("Client disconnected");
    numuser--;
});