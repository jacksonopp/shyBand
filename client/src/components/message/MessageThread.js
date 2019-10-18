import React, { useState, useEffect } from 'react';

import request from "superagent";
import jwtDecode from "jwt-decode"

import MessageInput from './MessageInput';

import "../../style/message.css"

export default function MessageThread({ match }) {
    const user = jwtDecode(localStorage.jwtToken.substr(7));
    // console.log(user)
    const threadId = match.params.id;
    const [messages, setMessages] = useState([]);
    const [toUser, setToUser] = useState("");
    const [toUserName, setToUserName] = useState("error");

    function getMessages() {
        request.get(`/api/thread/${threadId}`)
            .then(res => {
                // console.log("res: ", res.body);
                setMessages(res.body.messages);
                // console.log("from user:",res.body.fromUser)
                // console.log("to user:",res.body.toUser)
                if (res.body.toUser._id === user.id) {
                    setToUser(res.body.fromUser._id);
                    setToUserName(res.body.fromUser.name);
                } else if (res.body.fromUser._id === user.id) {
                    setToUser(res.body.toUser._id);
                    setToUserName(res.body.toUser.name);
                };
            })
    }

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            getMessages()
        }, 3000)
        return () => { clearInterval(interval) }
    }, [])

    return (
        <>
            <h1>Messages to {toUserName}</h1>
            <div className="messages">
                {messages.map(message => {

                    return (<div key={message._id}>
                        <p>message: {message.message}</p>
                        <p>sent by: {message.fromUser.name}</p>
                        <hr />
                    </div>)
                })
                }
            </div>
            <div className="message-input">
                < MessageInput
                    threadId={threadId}
                    currentUserId={user.id}
                    currentUserName={user.name}
                    toUserId={toUser}
                />
            </div>
        </>
    )
}