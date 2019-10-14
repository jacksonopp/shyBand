import React, { useState, useEffect } from 'react';
import request from "superagent";

import { Link } from 'react-router-dom';

export default function ViewMessages() {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const token = localStorage.jwtToken.substr(7);
        request.get(`/api/message/${token}`)
            .then(res => {
                setMessages(res.body)
                console.log(res.body)
            });
    }, [])
    return (
        <>
            {messages.map(message => (
                <>
                    <p>{message.message}</p>
                    <Link to={`/viewMessage/${message._id}`}>View Message</Link>
                </>
            ))}
        </>
    )
}