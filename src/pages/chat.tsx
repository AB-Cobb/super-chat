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
                <h1><span id="green">S</span>uper <span id="green">C</span>hat</h1>
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
                    <li><a href="/general">Room 1</a></li>
                    <li className="active"><a href="/tech" >Room 2</a></li>
                    <li><a href="">Room 3</a ></li>
                    <li><a href="">Room 4</a ></li>
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
        <main>
            <aside>
                <ul className="rm-links" >
                    <li><a href="/general">Room 1</a></li>
                    <li className="active"><a href="/tech" >Room 2</a></li>
                    <li><a href="">Room 3</a></li>
                    <li><a href="">Room 4</a></li>
                </ul>
            </aside>
        
            <section id="chatroom">
                <section id="feedback"></section>
            </section>
        </main>
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
            <div>
                <Title />
                <Roomnav />
                <Chatbox />
                <Userinputs />
            </div>
        )
    }
}
export default Chatpage;