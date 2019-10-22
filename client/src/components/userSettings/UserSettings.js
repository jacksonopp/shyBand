import React, { useState, useEffect } from 'react';

import request from "superagent"
import { Link } from 'react-router-dom';

import { Box, Heading, Text } from 'grommet';

export default function UserSettings() {
  const token = localStorage.jwtToken.substr(7);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    request.get(`/api/user/${token}`)
      .then(res => {
        setBands(res.body.bands)
      })
  }, [])
  return (
    <Box
      pad="medium"
      margin={{
        top: "8vh"
      }}
      direction="column"
      align="start"
    >
      <Link to="/updateBio">
        <Box
          align="center"
        >
          <Heading level={2}>Update Bio</Heading>
        </Box>
      </Link>
      <Heading level={3}>Manage Your Bands</Heading>
      {bands.map(band => (
        <p><Link to={`/manage/${band._id}`}>{band.bandName}</Link ></p>
      ))}
    </Box>
  )
}