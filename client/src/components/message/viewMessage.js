import React, { useState, useEffect } from 'react';
import request from "superagent";

export default function ViewMessages() {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        const token = localStorage.jwtToken.substr(7);
        request.get(`/api/message/${token}`)
            .then(res => console.log(res.body));
    }, [])
    return (
        <>
            <p>view messages</p>
        </>
    )
}