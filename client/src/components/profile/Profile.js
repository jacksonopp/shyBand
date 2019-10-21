import React from 'react';

import { Link } from 'react-router-dom';
import { Box, Text, Heading, Image } from "grommet";


export default function Profile({ userName, instruments, favBands, genres, userBands }) {
  return (
    <Box
      pad="small"
    >
      {/* Profile Pic */}
      <Box
        className="profilePicBox"
        align="center"
        pad={{
          top: "medium",
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
          <Box align="center">
            <Text size="xsmall" color="dark-2">INSTRUMENTS</Text>
          </Box>
          {instruments.map(instrument => (
            <span key={instrument.instrument}>{instrument.instrument} </span>
          ))}
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
          <Box align="center">
            <Text size="xsmall" color="dark-2">FAVORITE BANDS</Text>
          </Box>
          {favBands.map(band => (
            <span key={band.bandName}>{band.bandName} </span>
          ))}
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
          <Box align="center">
            <Text size="xsmall" color="dark-2">GENRES</Text>
          </Box>
          {genres.map(genre => (
            <span key={genre.genre}>{genre.genre} </span>
          ))}
        </Box>
        {/* User Bands */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height="xsmall"
        >
          <Box align="center">
            <Text size="xsmall" color="dark-2">{userName}'s BANDS</Text>
          </Box>
          {userBands.map(band => (
            <span key={band.bandName}><Link to={`/band/${band._id}`}>{band.bandName}</Link></span>
          ))}</Box>
      </Box>
    </Box>
  )
}