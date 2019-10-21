import React, { useState, useEffect } from 'react';

import request from 'superagent';

import { Box, Button, Heading, Text, ThemeContext } from 'grommet';
import { FormClose, Close, Checkmark } from 'grommet-icons'
// const bandID = window.location.href.substr(-24);

function apiGetBand(bandID, setBandCB, setBandOwnerCB, setMembersCB, setRequestsCB) {
  console.log("trigger");
  request.get(`/api/band/${bandID}`)
    .then(res => {
      console.log("this is the current band:", res.body);
      setBandCB(res.body)
      setBandOwnerCB(res.body.bandOwner)
      // get current members

      setMembersCB([]);
      res.body.bandMembers.forEach(member => {
        apiGetMembers(member, setMembersCB)
      })
      //get all requests
      setRequestsCB([])
      res.body.joinMembers.forEach(user => {
        apiGetRequests(user, setRequestsCB)
      })
    })
}

function apiGetMembers(input, setMembersCB) {
  // console.log(input);
  request.get(`/api/users/${input.member}`)
    .then(res => {
      let newUser = {
        userID: input.member,
        name: res.body.name,
        role: input.role
      }
      setMembersCB(existingMembers => [...existingMembers, newUser])
    })
}

function apiGetRequests(input, setRequestsCB) {
  let user = {}
  request.get(`/api/users/${input.user}`)
    .then(res => {
      let newUser = {
        userID: input.user,
        name: res.body.name,
        role: input.role
      }
      setRequestsCB(existingRequests => [...existingRequests, newUser])
    })
  return user;
}



export default function ManageBand({ match }) {
  const [band, setBand] = useState({});
  const [bandOwner, setBandOwner] = useState({});
  const [members, setMembers] = useState([]);
  const [requestUsers, setRequestUsers] = useState([]);
  const bandID = match.params.id;
  useEffect(() => {
    apiGetBand(bandID, setBand, setBandOwner, setMembers, setRequestUsers);
  }, [])
  return (
    <ThemeContext.Extend
      value={{
        global: {
          edgeSize: {
            small: 0
          }
        }
      }}
    >
      <Box
        margin={{
          top: "7vh"
        }}
        pad="medium"
        gap="small"
      >
        <Heading>Manage Band</Heading>
        <Text size="small" weight="bold">Name: <Text size="small" weight="normal">{band.bandName}</Text></Text>
        <Text size="small" weight="bold">Owner: <Text size="small" weight="normal">{bandOwner.name}</Text></Text>
        <Box>
          <Text size="small" weight="bold">Members:</Text>
          {members.map(member => (
            <Box
              key={member.name}
              direction="column"
            >
              <Box
                direction="row"
                align="center"
              >
                <Text size="small" margin={{ right: "1vw" }}>{member.name}: {member.role}</Text>
                {/* Remove Member */}
                <Button
                  margin="none"
                  padding="none"
                  icon={<Close color='neutral-2' />}
                  // alignSelf="start"
                  // label="remove"
                  onClick={() => {
                    request.delete("/api/band/delete")
                      .send({
                        bandID,
                        userID: member.userID
                      })
                      .then(res => {
                        apiGetBand(bandID, setBand, setBandOwner, setMembers, setRequestUsers)
                        console.log(res.body)
                      });
                  }}
                />
              </Box>
            </Box>
          ))}</Box>
        <Box>
          <Text size="small" weight="bold">requests:</Text>
          {requestUsers.map(user => (
            <Box
              key={user.name}
              direction="column"
            >
              <Box
                direction="row"
                align="center"
              >
                <Text size="small" margin={{ right: "1vw" }}>{user.name}:{user.role}</Text>
                {/* Accept */}
                <Button
                  icon={<Checkmark color="neutral-2" />}
                  onClick={() => {
                    request.put("/api/band/accept")
                      .send({
                        bandID,
                        user: user.name,
                        userID: user.userID,
                        role: user.role
                      })
                      .then(res => {
                        console.log(res.body)
                        apiGetBand(bandID, setBand, setBandOwner, setMembers, setRequestUsers);
                      })
                  }} />
                {/* Deny */}
                <Button
                  icon={<Close color="neutral-2" />}
                  onClick={() => {
                    console.log("deny:", user.userID)
                    request.put("/api/band/reject")
                      .send({
                        bandID,
                        user: user.name,
                        userID: user.userID,
                        role: user.role
                      })
                      .then(res => {
                        console.log(res.body)
                        apiGetBand(bandID, setBand, setBandOwner, setMembers, setRequestUsers)
                      })
                  }} />
              </Box>
            </Box>
          ))}</Box>
      </Box>
    </ThemeContext.Extend>
  )
}