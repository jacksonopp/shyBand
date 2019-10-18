import React, { useState, useEffect } from 'react';

import request from "superagent"
import { Link } from 'react-router-dom';

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
            <h1>Settings</h1>
            <Link to="/updateBio">Update Bio</Link>
            <h3>Manage Bands</h3>
            {bands.map(band => (
                <p><Link to={`/manage/${band._id}`}>{band.bandName}</Link ></p>
            ))}
        </>
    )
}