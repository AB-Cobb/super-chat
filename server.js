const express = require ('express')
const app = express()
const path = require('path');

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


pastmessages = {
    general : [],
    coding : [],
    tech : [],
    off : []
    };
colors = ["#035",
          "#050",
          "#500",
          "#505",
          "#550",
          "#005"]
numuser = 0;


function getPastMessages (room)
{
    if (room == 'general')
        return pastmessages.general
    else if (room == 'coding')
        return pastmessages.coding
    else if (room == 'tech')
        return pastmessages.tech
    else if (room == 'off')
        return pastmessages.off
}

function addMessage(room, msg){
    if (room == 'general')
        pastmessages.general.push(msg)
    else if (room == 'coding')
        pastmessages.coding.push(msg)
    else if (room == 'tech')
        pastmessages.tech.push(msg)
    else if (room == 'off')
        pastmessages.off.push(msg)
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
    let pastmsg = getPastMessages('general');
    for (message in pastmsg){
        socket.emit ("new_message",
            {message : pastmsg[message].message, username : pastmsg[message].username, color : pastmsg[message].color}
        )
    }//*/

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

        let pastmsg = getPastMessages(data.room);
        for (message in pastmsg){
            socket.emit ("new_message",
            {message : pastmsg[message].message, username : pastmsg[message].username, color : pastmsg[message].color}
            )
        }
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