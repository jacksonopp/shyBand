import React, { useState, useEffect } from 'react';

import request from "superagent";
import jwtDecode from "jwt-decode";
import { Link } from 'react-router-dom';

import { Box, Text, Heading } from "grommet";
import { Previous } from "grommet-icons";

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
  // gets messages on page load
  useEffect(() => {
    getMessages()
  }, [])
  // gets messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getMessages()
    }, 3000)
    return () => { clearInterval(interval) }
  }, [])

  return (
    <Box
      pad="medium"
    >
      <Box
        direction="row"
        align="center"
        gap="small"
      >
        <Link to="/ViewMessage"><Previous color="neutral-2" /></Link>
        <Heading margin={{
          top: "none",
          bottom: "small"
        }}>{toUserName}</Heading>
      </Box>
      <Box
        className="messages"
        gap="small"
        direction="column"
      >
        {messages.map(message => {
          if (message.fromUser._id === user.id) {
            return (
              <Box
                key={message._id}
                background={{ color: "neutral-3" }}
                round={{
                  size: "xlarge",
                  corner: "right"
                }}
                pad={{
                  top: "medium",
                  bottom: "medium",
                  left: "medium",
                  right: "large"
                }}
                width="fit-content"
                animation={{
                  type: "slideRight",
                  duration: 250
                }}
              >
                <Text color="light-1">{message.message}</Text>
                {/* <Text color="light-1">sent by: {message.fromUser.name}</Text> */}

              </Box>
            )
          } else {
            return (
              <Box
                key={message._id}
                background={{ color: "light-3" }}
                round={{
                  size: "xlarge",
                  corner: "left"
                }}
                pad={{
                  top: "medium",
                  bottom: "medium",
                  left: "large",
                  right: "medium"
                }}
                width="fit-content"
                alignSelf="end"
                animation={{
                  type: "slideLeft",
                  duration: 250
                }}
              >
                <Text>{message.message}</Text>
                {/* <Text>sent by: {message.fromUser.name}</Text> */}
              </Box>
            )
          }
        })
        }
      </Box>
      <div className="message-input">
        < MessageInput
          threadId={threadId}
          currentUserId={user.id}
          currentUserName={user.name}
          toUserId={toUser}
        />
      </div>
    </Box>
  )
}