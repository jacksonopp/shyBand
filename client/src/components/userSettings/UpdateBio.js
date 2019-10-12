import React, { useState, useEffect } from 'react';
import request from "superagent";

export default function UpdateBio() {
  const [primaryInstrument, setPrimaryInstrument] = useState("");
  const [userToken, setUserToken] = useState("");
  useEffect(() => {
    const token = localStorage.jwtToken.substr(7);
    setUserToken(token);
  }, [])
  return (
    <>
      <h1>Update Bio</h1>
      <form>
        <label for="primaryIns">Primary Instrument</label>
        <input id="primaryIns" type="text" value={primaryInstrument} onChange={e => setPrimaryInstrument(e.target.value)} />
        <button onClick={
          e => {
            e.preventDefault();
            request.put(`/api/user/${userToken}`)
              .send({
                primaryInstrument
              })
              .then(res => console.log(res.body))
              .catch(err => console.log(err))
          }
        }>Submit</button>
      </form>
    </>
  )
}