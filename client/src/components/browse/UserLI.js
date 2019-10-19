import React from 'react';

import { Link } from "react-router-dom";
import { Box, Text } from 'grommet';

export default function UserLI({ user }) {

  return (
    <Link to={"profile/" + user._id}>
      <Box
        key={user.name}
        direction="row"
        border={{
          color: "neutral-2",
          size: "xsmall"
        }}
        pad={{
          top: "small",
          left: "medium",
          bottom: "small",
        }}
        round="4px"
        align="stretch"
        gap="small"
        elevation="small"
      >
        <Box>
          <img src="http://www.fillmurray.com/50/50" alt={user.name} />
        </Box>
        <Box
          direction="column"
          alignSelf="center"
        >
          <Text>name: {user.name}</Text>
          <Text>
            genres: {user.genre.map(gen => (
              <span key={gen.genre}>{gen.genre} </span>
            ))}
          </Text>
        </Box>
        <Box
          alignSelf="center"
        >
          {/* <Link to={"profile/" + user._id}>
            <User color="neutral-2" />
          </Link> */}
        </Box>
      </Box>
    </Link>
  )
}