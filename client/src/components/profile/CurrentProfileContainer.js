import React, { useEffect, useState } from 'react';
import request from "superagent";

import Profile from "./Profile"

export default function Proflie() {
  // const { currentUser } = auth

  const [user, setUser] = useState({});
  const [instruments, setInstruments] = useState([]);
  const [band, setBand] = useState([]);
  const [genre, setGenre] = useState([]);
  const [userBands, setUserBands] = useState([]);

  useEffect(() => {
    const token = localStorage.jwtToken.substr(7);
    request.get(`/api/user/${token}`)
      .then(res => {
        console.log(res.body);
        setUser(res.body);
        setUserBands(res.body.bands)
        setInstruments(res.body.instruments);
        setBand(res.body.favoriteBands ? res.body.favoriteBands : ["none set yet"]);
        setGenre(res.body.genre);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <Profile userName={user.name} instruments={instruments} favBands={band} genres={genre} userBands={userBands} />
    </>
  )
}

