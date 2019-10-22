import React, { useEffect, useState } from 'react';
import request from "superagent";
import { Box } from "grommet"

import Profile from "./Profile"

function getFromApi({ setUser, setInstruments, setBand, setGenre, setUserBands }) {
  const token = localStorage.jwtToken.substr(7);
  request.get(`/api/user/${token}`)
    .then(res => {
      setUser(res.body);
      setUserBands(res.body.bands)
      setInstruments(res.body.instruments);
      setBand(res.body.favoriteBands);
      setGenre(res.body.genre);
    })
    .catch(err => console.log(err))
}

export default function Proflie() {

  const [user, setUser] = useState({});
  const [instruments, setInstruments] = useState([]);
  const [band, setBand] = useState([]);
  const [genre, setGenre] = useState([]);
  const [userBands, setUserBands] = useState([]);


  useEffect(() => {
    getFromApi({ setUser, setInstruments, setBand, setGenre, setUserBands })
  }, [])

  return (
    <Box
      pad={{
        left: "medium",
        right: "medium"
      }}
      margin={{
        top: "7vh"
      }}
    >
      <Profile
        userName={user.name}
        instruments={instruments}
        favBands={band}
        genres={genre}
        userBands={userBands}
        // TODO: im pretty sure showEdit is a security risk, so I want to go back and fix it
        showEdit={true}
        update={() => getFromApi({ setUser, setInstruments, setBand, setGenre, setUserBands })}
      />
    </Box>
  )
}

