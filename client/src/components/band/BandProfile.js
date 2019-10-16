import React, { useState, useEffect } from 'react';

import request from "superagent";

export default function BandProfile() {
  const [band, setBand] = useState({})
  const id = window.location.href.substr(-24);


  useEffect(() => {
    request.get(`/api/band/${id}`)
      .then(res => console.log(res.body))
  }, [])
  return (
    <>
      <h1>Band Profile</h1>
    </>
  )
}