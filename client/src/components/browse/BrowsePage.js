import React, { useEffect, useState } from 'react';
import request from "superagent";

export default function BrowsePage() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const token = localStorage.jwtToken.substr(7);
    request.get(`/api/users/${token}`)
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
        <p>{user.name}</p>
      ))}
    </>
  )
}