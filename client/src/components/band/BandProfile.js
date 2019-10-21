import React, { useState, useEffect } from 'react';

import request from "superagent";

import { Box, Button, Heading, Text, TextInput } from 'grommet';

export default function BandProfile({ match }) {
  const [bandId, setBandId] = useState("");
  const [bandName, setBandName] = useState("");
  const [members, setMembers] = useState([]);
  const [joinInst, setJoinInst] = useState("");
  const id = match.params.id;


  useEffect(() => {
    request.get(`/api/band/${id}`)
      .then(res => {
        setBandName(res.body.bandName);
        setBandId(res.body._id);
        res.body.bandMembers.map(member => {
          request.get(`/api/users/${member.member}`)
            .then(res => {
              let newMember = {
                userID: member.member,
                name: res.body.name,
                role: member.role
              }
              setMembers(members => [...members, newMember]);
            })
        })
      })

  }, [])
  const token = localStorage.jwtToken.substr(7)
  return (
    <Box
      margin={{
        top: "7vh"
      }}
      direction="column"
      pad="medium"
      gap="small"
    >
      <Heading>{bandName}</Heading>
      <Heading level="3">Members</Heading>
      <Box>{members.map(member => {
        return (
          <>
            <Text size="small"><strong>{member.name}</strong> on the <strong>{member.role}</strong></Text>
          </>
        )
      }
      )}</Box>
      <Box
        gap="small"
      >
        <Heading level="3">Want to join this band?</Heading>
        <TextInput
          id="instrument"
          value={joinInst}
          onChange={e => setJoinInst(e.target.value)}
          placeholder="what instrument do you play?"
          aria-label="what instrument do you play?"
        />
        <Button
          color="neutral-2"
          label="request to join"
          alignSelf="center"
          onClick={
            e => {
              e.preventDefault();
              console.log(bandId);
              request.post(`/api/band/join/${bandId}`)
                .send({
                  joinInst,
                  token
                })
                .then(res => {
                  console.log(res.body)
                  window.location.href = `/profile/${res.body.bandOwner}`
                })
            }
          }
        />
      </Box>
    </Box >
  )
}