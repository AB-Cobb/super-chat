import React, { Component } from 'react';
import socketIOClient  from 'socket.io-client';

interface chatState{
    name : string
    prevname : string
    room : string
    msg : string
    socket : SocketIOClient.Socket
    msglist : any
}


class Chatpage extends Component <{}, chatState>{
    
    constructor(props : any) {
        super(props);
        this.state = {
            name: "Anonymouse",
            prevname: "Anonymouse",
            room : "general",
            msg : "",
            socket : socketIOClient(),
            msglist : []
        };
        this.updateMsg = this.updateMsg.bind(this);
        this.updateName = this.updateName.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        const socket = this.state.socket;
        const room = this.state.room
        socket.on("new_message", (data : { username: string; message: string; color : string}) => {
            console.log(data)
            let msglist : [{ username: string; message: string; color : string}]= this.state.msglist 
            msglist.push(data)
            this.setState({msglist : msglist});
        })
    }


    changeRm (room : string){
        this.setState({room : room})
        this.setState(({msglist : []}))
        let socket = this.state.socket;
        socket.emit("switch_room", {room : room})
        this.setState({socket : socket})
    }
 

    updateMsg(e : React.FormEvent<HTMLInputElement> ){
        this.setState({msg: e.currentTarget.value});
    }
    updateName(e : React.FormEvent<HTMLInputElement> ){
        this.setState({name: e.currentTarget.value});
    }
    sendMessage(){
        if (this.state.msg !== ""){
            const socket = this.state.socket;
            let msg : string = this.state.msg;
            //check for name change
            if (this.state.name !== this.state.prevname){
                if (this.state.name == ""){
                    this.setState({name : "Anonymouse"})
                }
                socket.emit("change_username", {username : this.state.name})
                this.setState({prevname : this.state.name})
            }
            socket.emit('new_message', {message : this.state.msg, username : "Test Name"/*this.state.name*/})
            this.setState({msg : ""})
        }
    }
    render () {
        
        let room = this.state.room;
        let links = [room == "general" ? <li className="active"><a >General</a></li> : <li><a onClick={() => this.changeRm('general')} >General</a></li>,
                     room == "coding" ?  <li className="active"><a>Coding</a ></li> : <li><a onClick={() => this.changeRm('coding')} >Coding</a ></li>,
                     room == "off" ? <li className="active"><a>Off Topic</a ></li> : <li><a onClick={() => this.changeRm('off')}>Off Topic</a ></li>,
                     room == "tech" ? <li className="active"><a>Tech Help</a></li> :   <li><a onClick={() => this.changeRm('tech')}>Tech Help</a></li>]
        return (
            <div style = {{height:"100vh"}}>
                <header>
                    <h1><span id="green">the R</span>eact <span id="green">H</span>ack <span id="green">C</span>hat</h1>
                </header>
                <main>
                    <aside>
                        <ul className="rm-links" >
                            {links[0]}
                            {links[1]}
                            {links[2]}
                            {links[3]}
                        </ul>
                    </aside>
                    <section id="chatroom">
                        {this.state.msglist.map((message: { username: string; message: string; color : string})  => {
                            return (
                                <div className="message" style={{ background: message.color}}>
                                    <span> {message.username}:</span>
                                    <p className='message_content'>{message.message} </p>
                                </div>
                            )
                        })}
                    </section>
                </main>
                <footer>
                    <section id="user_input">
                        <div>
                            <span> Posting as: </span>
                            <input id="username" type="text" value={this.state.name} onChange={this.updateName}/>
                        </div>
                        <div id="input_zone">
                            <input id="message"  type="text" value={this.state.msg} onChange={this.updateMsg}/>
                            <button onClick={this.sendMessage} id="send_message" type="button">Send</button>
                        </div>
                    </section>
                    <p id="copy">&copy;2020 Andrew Cobb</p>
                </footer>
            </div>
        )
    }
}
export default Chatpage;