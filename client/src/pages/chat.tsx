import React, { Component } from 'react';

export class Title extends Component {
    constructor(props : any) {
        super(props);
        this.state = {
          value: null,
        };
    }
    render () {
        return (
            <header>
                <h1>The <span id="green">R</span>eact <span id="green">H</span>ack <span id="green">C</span>hat</h1>
            </header>
        )
    }
}

class Roomnav extends Component {
    constructor(props : any) {
        super(props);
        this.state = {
          value: null,
        };
    }
    render () {
        return (
            <aside>
                <ul className="rm-links" >
                    <li><a href="/general">General</a></li>
                    <li className="active"><a href="/tech" >Tech Help</a></li>
                    <li><a href="code">Code Samples</a ></li>
                    <li><a href="off">Off Topic</a ></li>
                </ul>
            </aside>
        )
    }
}

class Chatbox extends Component {
    constructor(props : any) {
        super(props);
        this.state = {
          value: null,
        };
    }
    render () {
    return (
            <section id="chatroom">
                <section id="feedback"></section>
            </section>
        )
    }
}

class Userinputs extends Component {
    constructor(props : any) {
        super(props);
        this.state = {
          value: null,
        };
      }

    render () {
        return (
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
        )
    }
}

class Chatpage extends Component {
    constructor(props : any) {
        super(props);
        this.state = {
          value: null,
        };
    }
    render () {
        return (
            <div style = {{height:"100vh"}}>
                <Title />
                <main>
                    <Roomnav />
                    <Chatbox />
                </main>
                <Userinputs />
            </div>
        )
    }
}
export default Chatpage;