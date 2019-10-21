import React, { useState, useEffect } from 'react';
import request from "superagent";

import { Link } from 'react-router-dom';
import { Box, Heading, Text } from 'grommet';

export default function ViewMessages() {
  const [messageThreads, setMessageThreads] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const token = localStorage.jwtToken.substr(7);
    //get current user
    let user = "";
    async function getData() {
      await request.get(`/api/user/${token}`)
        .then(res => {
          user = res.body;
        });
      // pull out all user's threads
      let threads = [];
      setCurrentUser(user);
      threads = user.thread;
      // get all the threads info from Threads model
      setMessageThreads(threads);
    }
    getData();
  }, [])
  return (
    <Box
      pad="medium"
      direction="column"
      gap="small"
      margin={{
        top: "xlarge"
      }}
    >
      {messageThreads.map(thread => {
        let toUserName = "";
        if (thread.toUser._id === currentUser._id) {
          toUserName = thread.fromUser.name
        }

        return (
          <Link to={`/viewMessage/${thread._id}`} key={thread._id}>
            <Box
              border={{
                color: "neutral-2"
              }}
              round="4px"
              pad="small"
              elevation="small"
            >
              <Heading level={4} margin="none">{toUserName || thread.toUser.name}</Heading>
              <Text>
                {thread.messages[thread.messages.length - 1].message.substr(0, 35)}
                {thread.messages[thread.messages.length - 1].message.length > 35 && "..."}
              </Text>
            </Box>
          </Link>
        )
      })}
    </Box>
  )
}