const express = require ('express');
const app = express();
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose');

const dbconf = require('./db/db')
//import models
const Log = require('./models/log');
const Pastmessages = require('./models/messages')

mongoose.connect(process.env.MONGODB_URI || dbconf.db, {
    useNewUrlParser: true
  }).then(() => {
      console.log('Database connected')
    },
    error => {
      console.log('Could not connect to DB: ' + error)
    }
  )

//app.set ('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'client/build')));

//testing
app.get('/express_backend', (req, res) => {
    res.send({ express: 'EXPRESS WORKS!' });
  });

//Routing
    //Messages
app.route('/api/msg').get((req, res) => {
    //res.send({ api: 'Here be API' });
    Pastmessages.find().exec((error, data) => {
        if (error) {
            console.log(error);
            res.json({ Error: error });
        } else {
            console.log("message API ", data)
            res.json(data);
        }
    })
});
    //Logs 
app.route('/api/log').get((req, res) => {
    Logs.find((error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
        }
    })
});

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname , '/client/build/index.html'))
  });

//PORTS
server = app.listen(process.env.PORT || 3000)

//Socket
const chat_io = require("socket.io")(server)

var colors = ["#035",
                "#050",
                "#500",
                "#505",
                "#550",
                "#005"]
var numuser = 0;

/*
function getPastMessages (room)
{  
    return new Promise (Pastmessages.find({room : room}).exec((error, data) => {
        if (error) {
            console.log(error);
            return null
        }
        console.log("past msg Data = " ,data )
        return data
        })
    )
}//*/

function addMessage(room, msg){
    msg.room = room;
    Pastmessages.create(msg, (error, data) => {
        if (error) {
            console.log(error);
            return
        }
        console.log("adding message ", data)
    })
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
    
    getPastMessages('general').then((pastmsg) => {
        console.log("emit past messages: ", pastmsg)
        for (message in pastmsg){
            console.log("emit past msg : ", message)
            socket.emit ("new_message",
                {message : pastmsg[message].message, username : pastmsg[message].username, color : pastmsg[message].color}
            )
        }
    });


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
        Pastmessages.find({room : 'general'}).exec((error, data) => {
            if (error) {
                console.log(error);
                return null
            }
            console.log("past msg Data = " ,data )
                for (message in pastmsg){
                    socket.emit ("new_message",
                    {message : pastmsg[message].message, username : pastmsg[message].username, color : pastmsg[message].color}
                    )
                }
            })
            /*
        let pastmsg = getPastMessages(data.room)
        for (message in pastmsg){
            socket.emit ("new_message",
            {message : pastmsg[message].message, username : pastmsg[message].username, color : pastmsg[message].color}
            )
        }//*/
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