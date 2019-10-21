import React from 'react';

import { Link } from 'react-router-dom';
import { Box, Text, Heading, Image } from "grommet";


export default function Profile({ userName, instruments, favBands, genres, userBands }) {
  return (
    <Box
      pad="small"
    // margin={{
    //   top: "7vh"
    // }}
    >
      {/* Profile Pic */}
      <Box
        className="profilePicBox"
        align="center"
        pad={{
          bottom: "medium"
        }}
        border={{
          side: "bottom",
          color: "light-6"
        }}
      >
        <Box elevation="small">
          <Image
            fit="cover"
            src="http://www.fillmurray.com/100/100" alt={userName} />
        </Box>
      </Box>
      {/* Profile Info */}
      <Box
        className="profileInfoBox"
      >
        {/* Username */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          align="center"
        >
          <Heading margin="none">{userName}</Heading>
        </Box>
        {/* Instruments */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height="xsmall"
        >
          <Box align="center" margin={{ bottom: "small" }}>
            <Text size="xsmall" color="dark-2">INSTRUMENTS</Text>
          </Box>
          <Box wrap={true}>
            {instruments.map(instrument => (
              <span key={instrument.instrument}>{instrument.instrument} </span>
            ))}
          </Box>
        </Box>
        {/* Favorite Bands */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height="xsmall"
        >
          <Box align="center" margin={{ bottom: "small" }}>
            <Text size="xsmall" color="dark-2">FAVORITE BANDS</Text>
          </Box>
          <Box wrap={true}>
            {favBands.map(band => (
              <span key={band.bandName}>{band.bandName} </span>
            ))}
          </Box>
        </Box>
        {/* Genres */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height="xsmall"
        >
          <Box align="center" margin={{ bottom: "medium" }}>
            <Text size="xsmall" color="dark-2">GENRES</Text>
          </Box>
          <Box wrap={true}>
            {genres.map(genre => (
              <span key={genre.genre}>{genre.genre} </span>
            ))}
          </Box>
        </Box>
        {/* User Bands */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height="small"
        >
          <Box align="center" margin={{ bottom: "medium" }} width="100vw">
            <Text size="xsmall" color="dark-2">{userName}'s BANDS</Text>
          </Box>
          <Box wrap={true}>
            {userBands.map(band => (
              <Text size="small" margin={{ right: "xsmall" }} key={band.bandName} truncate={true}>
                <Link to={`/band/${band._id}`}>{band.bandName}</Link>
              </Text>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}