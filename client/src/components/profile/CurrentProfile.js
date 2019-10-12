import React, { useEffect, useState } from 'react';
import request from "superagent";

import Profile from "./Profile"

export default function Proflie() {

  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.jwtToken.substr(7);
    console.log(token);
    request.get(`/api/user/${token}`)
      .then(res => {
        setUser(res.body);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <Profile userName={user.name} primaryInstrument={user.primaryInstrument} />
    </>
  )
}