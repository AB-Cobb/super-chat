import React, { Component } from 'react';

class chatbox extends Component {
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