import React, { useState } from 'react';

import request from "superagent";

import { Box, Heading, TextInput, Form, Button } from "grommet";

export default function CreateBand() {
  const token = localStorage.jwtToken.substr(7);
  const [bandName, setBandName] = useState("");
  const [role, setRole] = useState("");
  return (
    <Box
      pad="medium"
      margin={{
        top: "7vh"
      }}
      gap="small"
      align="center"
      direction="column"
    >
      <Heading>create a band</Heading>
      <Form>
        <Box
          gap="small"
          align="center"
          direction="column"
        >
          <TextInput
            value={bandName}
            onChange={e => setBandName(e.target.value)}
            placeholder="band name"
            aria-label="band name"
          />
          <TextInput
            value={role}
            onChange={e => setRole(e.target.value)}
            placeholder="instrument"
            aria-label="instrument"
          />
          <Button
            label="submit"
            onClick={
              e => {
                e.preventDefault()
                request.post("/api/band")
                  .send({
                    bandName,
                    role,
                    token
                  })
                  .then(res => {
                    console.log(res.body.dbBand._id)
                    window.location.href = `/band/${res.body.dbBand._id}`
                  })
              }
            }
          />
        </Box>
      </Form>
    </Box>
  )
}