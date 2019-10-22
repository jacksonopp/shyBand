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
    <>
      <Heading level={3}
        margin={{
          top: "8vh",
          left: "medium"
        }}
      >
        Manage Your Bands
          </Heading>
      <Box
        pad="medium"
        direction="row"
        align="start"
        gap="small"
        wrap={true}
      >
        {bands.map(band => (
          <Link to={`/manage/${band._id}`}>
            <Box
              border={{
                color: "neutral-2"
              }}
              round="4px"
              pad="small"
              margin={{
                bottom: "small"
              }}
            >
              {band.bandName}
            </Box>
          </Link >
        ))}
      </Box>
    </>
  )
}