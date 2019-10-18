import React from 'react';

import { Link } from "react-router-dom";

export default function UserLI({ user }) {

    return (
        <div key={user.name}>
            <p>name: {user.name}</p>
            <span>instruments: {user.instruments.map(instrument => (
                <p key={instrument.instrument}>{instrument.instrument}</p>
            ))}</span>
            <span>genres: {user.genre.map(gen => (
                <p key={gen.genre}>{gen.genre}</p>
            ))}</span>
            <Link to={"profile/" + user._id}>View Proflie</Link>
            <hr />
        </div>
    )
}