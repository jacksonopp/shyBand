import React, { useState, useEffect } from 'react';

import request from "superagent";

export default function SendMessagePage({ match }) {
    const id = match.params.id;
    const [message, setMessage] = useState("");
    const [send, setSend] = useState({});
    const [token, setToken] = useState("");

    useEffect(() => {
        const userToken = localStorage.jwtToken.substr(7);
        setToken(userToken);
    }, [])

    return (
        <>
            <p>send message to user {id}</p>
            <p>message: {send.message}</p>
            <p>to: {send.to}</p>
            <p>from: {token}</p>
            <form>
                <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                ></textarea>
                <button onClick={async function (e) {
                    e.preventDefault()
                    await setSend({
                        message,
                        to: id
                    })
                    request.post("/api/thread")
                        .send({
                            message: message,
                            toUser: id,
                            fromUser: token
                        })
                        .then(res => console.log(res.body))
                }}>Submit</button>
            </form>
        </>
    )
}