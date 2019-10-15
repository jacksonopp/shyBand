import React, { useState, useEffect } from 'react';

import request from "superagent";
import jwtDecode from "jwt-decode"

import MessageInput from './MessageInput';

export default function MessageThread() {
    const user = jwtDecode(localStorage.jwtToken.substr(7));
    console.log(user)
    const threadId = window.location.href.substr(-24);
    const [messages, setMessages] = useState([]);
    const [toUser, setToUser] = useState("");
    const [toUserName, setToUserName] = useState("error");
    const [fromUser, setFromUser] = useState("");
    const [fromUserName, setFromUserName] = useState("")

    useEffect(() => {
        request.get(`/api/thread/${threadId}`)
            .then(res => {
                // console.log("res: ", res.body);
                setMessages(res.body.messages);
                // console.log("from user:",res.body.fromUser)
                // console.log("to user:",res.body.toUser)
                if (res.body.toUser._id === user.id) {
                    setToUser(res.body.fromUser._id);
                    setToUserName(res.body.fromUser.name)
                    setFromUser(res.body.toUser._id);
                    setFromUserName(res.body.toUser.name)
                } else if (res.body.fromUser._id === user.id) {
                    setToUser(res.body.toUser._id);
                    setToUserName(res.body.toUser.name);
                    setFromUser(res.body.fromUser._id);
                    setFromUserName(res.body.fromUser.name);
                };
            })
    }, [])
    return (
        <>
            <h1>Messages to {toUserName}</h1>
            {messages.map(message => {

                return (<>
                    <p>message: {message.message}</p>
                    <p>sent by: {message.fromUser.name}</p>
                    <hr />
                </>)
            })
            }
            < MessageInput threadId={threadId} currentUserId={user.id} currentUserName={user.name} toUserId={toUser} />
        </>
    )
}