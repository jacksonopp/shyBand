import React, { useState, useEffect } from 'react';
import request from "superagent";

export default function UpdateBio() {
  const [primaryInstrument, setPrimaryInstrument] = useState("");
  const [userToken, setUserToken] = useState("");
  const [favBand, setFavBand] = useState("");
  const [genre, setGenre] = useState("");
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
        <label for="primaryIns">Favorite Bands</label>
        <input id="primaryIns" type="text" value={favBand} onChange={e => setFavBand(e.target.value)} />
        <label for="primaryIns">Genre</label>
        <input id="primaryIns" type="text" value={genre} onChange={e => setGenre(e.target.value)} />
        <button onClick={
          e => {
            e.preventDefault();
            request.put(`/api/user/${userToken}`)
              .send({
                primaryInstrument,
                favBand,
                genre
              })
              .then(res => console.log(res.body))
              .catch(err => console.log(err))
          }
        }>Submit</button>
      </form>
    </>
  )
}