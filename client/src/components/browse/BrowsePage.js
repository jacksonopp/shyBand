import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import request from "superagent";

export default function BrowsePage() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const token = localStorage.jwtToken.substr(7);
    request.get(`/api/users/all/${token}`)
      .then(res => {
        console.log(res.body);
        setUsers(res.body);
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <h1>Browse</h1>
      {users.map(user => (
        <>
          <div>
            <p>name: {user.name}</p>
            <p>instrument: {user.primaryInstrument}</p>
            <Link to={"profile/" + user._id}>View Proflie</Link>
            <hr />
          </div>
        </>

      ))}
    </>
  )
}