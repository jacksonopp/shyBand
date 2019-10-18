import React from 'react';

import { Link } from "react-router-dom";
import { Box } from 'grommet';

export default function UserLI({ user }) {

    return (
        <Box
            key={user.name}
            direction="row"
            border={{
                color: "dark-1",
                size: "small"
            }}
            round="4px"
        >
            <p>name: {user.name}</p>
            <span>instruments: {user.instruments.map(instrument => (
                <p key={instrument.instrument}>{instrument.instrument}</p>
            ))}</span>
            <span>genres: {user.genre.map(gen => (
                <p key={gen.genre}>{gen.genre}</p>
            ))}</span>
            <Link to={"profile/" + user._id}>View Proflie</Link>
        </Box>
    )
}