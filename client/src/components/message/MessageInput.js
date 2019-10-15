import React, { useState } from 'react';

import request from "superagent";

export default function MessageInput({ threadId, currentUserId, currentUserName, toUserId }) {
  const [message, setMessage] = useState("")
  return (
    <>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
      >

      </textarea>
      <button
        onClick={() => {
          request.post(`/api/thread/${threadId}`)
            .send({
              message,
              fromUser: currentUserId,
              toUser: toUserId,
              threadId
            })
            .then(res => console.log(res.body));
          window.location.reload();
        }}
      >Submit</button>
    </>
  )
}