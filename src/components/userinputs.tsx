import React, { Component } from 'react';

class Userinputs extends Component {
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