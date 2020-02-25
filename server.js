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


function getPastMessagees (room)
{

}

function addMessage(room){

}


//listen to everything
chat_io.on('connection', (socket) => {
    console.log('New user connected')
    //set color
    console.log(numuser)
    socket.color = colors[numuser]
    numuser++;
    numuser = numuser%colors.length;
    socket.join('general')
    let pastmsg = pastmessages.general;
    // send new user messages
    /*
    for (message in pastmsg){
        socket.emit ("new_message",
            {message : messages[message].message, username : messages[message].username, color : messages[message].color}
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
        console.log(data.room);
        socket.leave()
        socket.join(data.room)
 
        chat_io.sockets.emit("new_message", {message : "switching to room " + data.room,  username : socket.username, color : socket.color})
        /*
        let messages;
        if (data.room=='general')
            messages = pastmessages.general;
        else if (data.room=='coding')
            messages = pastmessages.coding;
        else if (data.room=='tech')
            messages = pastmessages.tech;
        else if (data.room=='off')
            messages = pastmessages.off;
        for (message in messages){
            socket.emit ("new_message",
                {message : messages[message].message, username : messages[message].username, color : messages[message].color}
            )
        }//*/
    })

    //listen to new message
    socket.on("new_message", (data) => {
        message = {message : data.message + " in room " + socket.room, username : socket.username, color : socket.color};
        /*
        let messages;
        if (socket.room=='general')
            messages = pastmessages.general;
        else if (socket.room=='coding')
            messages = pastmessages.coding;
        else if (socket.room=='tech')
            messages = pastmessages.tech;
        else if (socket.room=='off')
            messages = pastmessages.off;
        messages.push(message);
        // */
        //console.log(messages)
        //chat_io.sockets.emit ("new_message", message);
        chat_io.sockets.to('coding').emit ("new_message", message);
    })
})

chat_io.on('disconnect', function (data){
    console.log ("Client disconnected");
    numuser--;
});