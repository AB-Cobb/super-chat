const express = require ('express')
const app = express()

//app.set ('view engine', 'ejs')

app.use (express.static('public'))

//testing
app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
  });

//Routing
app.get('/**', (req, res) => {
    res.sendfile(path.join(__dirname , 'client/public/index.html'))
  });

//PORTS
server = app.listen(3000)

//Socket
const chat_io = require("socket.io")(server)

messages = [];
colors = ["#035",
          "#050",
          "#500",
          "#505",
          "#550",
          "#005"]
numuser = 0;


//listen to everything
chat_io.on('connection', (socket) => {
    console.log('New user connected')
    //set color
    console.log(numuser)
    socket.color = colors[numuser%colors.length]
    numuser++;
    // send new user messages
    for (message in messages){
        socket.emit ("new_message",
            {message : messages[message].message, username : messages[message].username, color : messages[message].color}
        )
    }

    //defalt name
    socket.username = "Anonymouse"

    //listen to change name
    socket.on ("change_username", (data) => {
        console.log(data.username)
        socket.username = data.username;
    })

    //listen to new message
    socket.on("new_message", (data) => {
        message = {message : data.message, username : socket.username, color : socket.color};
        messages.push(message);
        //console.log(messages)
        chat_io.sockets.emit ("new_message", message);
    })
})

chat_io.on('disconnect', function (data){
    console.log ("Client disconnected");
    numuser--;
});