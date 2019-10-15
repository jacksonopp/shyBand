import React, { useState, useEffect } from 'react';

import request from "superagent";

export default function MessageThread() {
    const threadId = window.location.href.substr(-24);
    const [messages, setMessages] = useState([])
    useEffect(() => {
        request.get(`/api/thread/${threadId}`)
            .then(res => {
                console.log("res: ", res.body)
                setMessages(res.body.messages)
            })
    }, [])
    return (
        <>
            <h1>Messages</h1>
            {messages.map(message => (
                <>
                    <p>message: {message.message}</p>
                    <p>sent by: {message.fromUser.name}</p>
                    <p>sent to: {message.toUser.name}</p>
                </>
            ))}
        </>
    )
}