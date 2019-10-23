import React, { useState, useEffect } from 'react';
import request from 'superagent';
import jwtDecode from "jwt-decode";
import { Link } from 'react-router-dom';

import { Box, Heading, Text } from 'grommet';
import { User } from 'grommet-icons';

export default function Dashboard() {
  const token = localStorage.jwtToken.substr(7);
  const userID = jwtDecode(token).id
  const userName = jwtDecode(token).name
  const [recentMessages, setRecentMessages] = useState([]);
  const [user, setUser] = useState({});
  const [bands, setBands] = useState([]);

  useEffect(() => {
    request.get(`/api/user/${token}`)
      .then(res => {
        setUser(res.body)
        // console.log(res.body)
        setBands(res.body.bands.filter(band => band.joinMembers.length !== 0))
        // console.log(res.body.bands.filter(band => band.joinMembers.length !== 0))
      })
    request.get(`/api/thread/recent/${token}`)
      .then(res => {
        setRecentMessages(res.body.dbThread)
      })
  }, []);
  return (
    <Box
      margin={{
        top: "7vh"
      }}
      pad="medium"
      gap="small"
    >
      {/* Welcome */}
      <Box
        margin={{
          bottom: "medium"
        }}
      >
        <Heading level="2">Welcome <Text size="xlarge" weight="normal">{userName}</Text></Heading>
        <Text>Want to <Link to="/profile">update your profile? <User color="neutral-2" /></Link></Text>
      </Box>
      {/* Recent Messages */}
      <Heading level="2" margin="none">Your Recent Messages</Heading>
      {recentMessages.map(message => (
        <Link to={`viewMessage/${message._id}`}>
          <Box
            border={{
              color: "neutral-2"
            }}
            key={message._id}
            round="4px"
            elevation="small"
            pad="small"
          >
            <Heading level={4} margin="none">{message.fromUser._id === userID ? message.toUser.name : message.fromUser.name}</Heading>
            <Text>{message.messages[message.messages.length - 1].message.substr(0, 35)}</Text>
            <Text>{message.messages[message.messages.length - 1].message.length > 35 && `...`}</Text>
          </Box>
        </Link>
      ))}
      {/* Bands with Requests */}
      <Heading level="2">Bands That Have Requests</Heading>
      {bands.map(band => (
        <Link to={`manage/${band._id}`}>
          <Box
            border={{
              color: "neutral-2"
            }}
            key={band._id}
            round="4px"
            elevation="small"
            pad="small"
          >
            <Text>{band.bandName}</Text>
          </Box>
        </Link>
      ))}
    </Box>
  )
}