import React, { useState } from 'react';

import request from "superagent";

export default function CreateBand() {
  const token = localStorage.jwtToken.substr(7);
  const [bandName, setBandName] = useState("")
  return (
    <>
      <h1>create a band</h1>
      <p>{bandName}</p>
      <form>
        <label for="bandName">Band Name</label>
        <input id="bandName" value={bandName} onChange={e => setBandName(e.target.value)} />
        <button onClick={(e) => {
          e.preventDefault()
          request.post("/api/band")
            .send({
              bandName,
              token
            })
            .then(res => console.log(res.body))
        }}>submit</button>
      </form>
    </>
  )
}