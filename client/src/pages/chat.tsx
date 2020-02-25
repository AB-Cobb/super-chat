import React, { Component } from 'react';
import socketIOClient  from 'socket.io-client';
interface chatState{
    name : string
    room : string
    msg : string
}

class Chatpage extends Component <{}, chatState>{
    constructor(props : any) {
        super(props);
        this.state = {
            name: "Anonymouse",
            room : "general",
            msg : ""
        };
    }
    componentDidMount(){
        var socket : SocketIOClient.Socket = socketIOClient('https://blooming-fortress-18235.herokuapp.com/')
        
    }

    updateMsg(e : React.FormEvent<HTMLInputElement> ){
        this.setState({msg: e.currentTarget.value});
    }
    updateName(e : React.FormEvent<HTMLInputElement> ){
        this.setState({name: e.currentTarget.value});
    }
    sendMessage(){
        let msg : string = this.state.msg;
        if (this.state.name == ""){
            this.setState({name : "Anonymouse"})
        }
        this.setState({msg : ""})
    }
    render () {
        let room = this.state.room;
        let links = [room == "general" ? <li className="active"><a >General</a></li> : <li><a onClick={() => this.setState({room : 'general'})} >General</a></li>,
                     room == "coding" ?  <li className="active"><a>Coding</a ></li> : <li><a onClick={() => this.setState({room : 'coding'})} >Coding</a ></li>,
                     room == "off" ? <li className="active"><a>Off Topic</a ></li> : <li><a onClick={() => this.setState({room : 'off'})}>Off Topic</a ></li>,
                     room == "tech" ? <li className="active"><a>Tech Help</a></li> :   <li><a onClick={() => this.setState({room : 'tech'})}>Tech Help</a></li>]
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
                        <section id="feedback"></section>
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