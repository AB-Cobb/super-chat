import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import App from '../App';

interface chatState{
    userName : string
    room : string
}

class Chatpage extends Component <{}, chatState>{
    constructor(props : any) {
        super(props);
        this.state = {
            userName: "Anonymouse",
            room : "general"
        };
    }
    render () {
        let room = this.state.room;
        let links = [room == "general" ? <li className="active"><a >General</a></li>:  <li><a onClick={() => this.setState({room : 'general'})} >General</a></li>,
                    room == "coding" ?  <li className="active"><a>Coding</a ></li> : <li><a onClick={() => this.setState({room : 'coding'})} >Coding</a ></li>,
                    room == "off" ? <li className="active"><a>Off Topic</a ></li>: <li><a onClick={() => this.setState({room : 'off'})}>Off Topic</a ></li>,
                    room == "tech" ? <li className="active"><a>Tech Help</a></li>:   <li><a onClick={() => this.setState({room : 'tech'})}>Tech Help</a></li>]
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
                <input id="username" type="text" value="Anonymouse"/>

            </div>
            <div id="input_zone">
                <input id="message"  type="text" />
                <button id="send_message" type="button">Send</button>
            </div>
            </section>
                <p id="copy">&copy;2020 Andrew Cobb</p>
            </footer>
            </div>
        )
    }
}
export default Chatpage;