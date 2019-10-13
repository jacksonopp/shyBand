import React, { useState } from 'react';

export default function SendMessagePage() {
    const id = window.location.href.slice(-24);
    const [message, setMessage] = useState("");
    const [send, setSend] = useState({});

    return (
        <>
            <p>send message to user {id}</p>
            <p>message: {send.message}</p>
            <p>to: {send.to}</p>
            <form>
                <textarea
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                ></textarea>
                <button onClick={e => {
                    e.preventDefault()
                    setSend({
                        message,
                        to: id
                    })
                }}>Subnit</button>
            </form>
        </>
    )
}