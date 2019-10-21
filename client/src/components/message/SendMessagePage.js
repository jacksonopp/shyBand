import React, { useState, useEffect } from 'react';

import { Box, Button, Text, TextArea } from 'grommet'
import { Send } from 'grommet-icons';

import request from "superagent";

export default function SendMessagePage({ match }) {
  const id = match.params.id;
  const [message, setMessage] = useState("");
  const [send, setSend] = useState({});
  const [token, setToken] = useState("");
  const [toUser, setToUser] = useState({})

  useEffect(() => {
    const userToken = localStorage.jwtToken.substr(7);
    setToken(userToken);
    request.get(`/api/users/${id}`)
      .then(res => setToUser(res.body))
  }, [])

  return (
    <Box
      margin={{
        top: "10vh"
      }}
    >
      {/* <p>send message to user {id}</p>
            <p>message: {send.message}</p>
            <p>to: {send.to}</p>
            <p>from: {token}</p> */}
      <Text margin={{
        bottom: "small"
      }}>Message to {toUser.name}</Text>
      <form>
        <TextArea
          placeholder="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Text>{message}</Text>
        <Button
          color="neutral-2"
          icon={<Send color="neutral-2" />}
          label="Send"
          onClick={
            async function (e) {
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
            }
          }
        />
        <button onClick={
          async function (e) {
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
    </Box>
  )
}