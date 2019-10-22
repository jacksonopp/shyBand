import React from 'react';

import { Link } from 'react-router-dom';
import { Box, Text, Heading, Image } from "grommet";

import Add from "./edit components/Add";
import Edit from "./edit components/Edit";
import Delete from "./edit components/Delete";

//TODO: showEdit is a security risk
export default function Profile({ userName, instruments, favBands, genres, userBands, showEdit, update }) {
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
          {/* Username */}
          <Heading margin="none">{userName}</Heading>
        </Box>
        {/* Instruments */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height={{
            min: "xmall",
            max: "18vh"
          }}
        >
          <Box align="center" margin={{ bottom: "small" }}>
            <Text size="xsmall" color="dark-2">INSTRUMENTS</Text>
          </Box>
          <Box wrap={true}>
            {instruments.map(instrument => (
              <Box
                direction="row"
                align="center"
                key={instrument.instrument}
                gap="small"
              >
                <Text size="small">{instrument.instrument}</Text>
              </Box>
            ))}
            {showEdit &&
              <Box
                direction="row"
                align="center"
              >
                <Add category="instrument" update={update} />
              </Box>}
          </Box>
        </Box>
        {/* Favorite Bands */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height={{
            min: "xsmall",
            max: "18vh"
          }}
        >
          <Box align="center" margin={{ bottom: "small" }}>
            <Text size="xsmall" color="dark-2">FAVORITE BANDS</Text>
          </Box>
          <Box wrap={true}>
            {favBands.map(band => (
              <span key={band.bandName}>{band.bandName} </span>
            ))}
            {showEdit &&
              <Box
                direction="row"
                align="center"
              >
                <Add category="bands" update={update} />
              </Box>
            }
          </Box>
        </Box>
        {/* Genres */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height={{
            min: "xmall",
            max: "18vh"
          }}
        >
          <Box align="center" margin={{ bottom: "medium" }}>
            <Text size="xsmall" color="dark-2">GENRES</Text>
          </Box>
          <Box wrap={true}>
            {genres.map(genre => (
              <span key={genre.genre}>{genre.genre} </span>
            ))}
            {showEdit &&
              <Box
                direction="row"
                align="start"
              >
                <Add category="genre" update={update} />
              </Box>}
          </Box>
        </Box>
        {/* User Bands */}
        <Box
          border={{
            side: "bottom",
            color: "light-6"
          }}
          pad="small"
          height={{
            min: "xsmall",
            max: "25vh"
          }}
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
            {showEdit && <Link to="/createBand"><Text weight="bold">Create a new band</Text></Link>}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}