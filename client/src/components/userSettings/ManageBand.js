import React, { useState, useEffect } from 'react';

import request from 'superagent';

export default function ManageBand() {
  const bandID = window.location.href.substr(-24);
  const [band, setBand] = useState({});
  const [bandOwner, setBandOwner] = useState({});
  const [members, setMembers] = useState([]);
  const [requestUsers, setRequestUsers] = useState([]);
  useEffect(() => {
    //get band
    request.get(`/api/band/${bandID}`)
      .then(res => {
        console.log(res.body);
        setBandOwner(res.body.bandOwner)
        setBand(res.body);
        //get current members
        res.body.bandMembers.map(member => {
          console.log("tick")
          request.get(`/api/users/${member.member}`)
            .then(res => {
              let newMember = {
                userID: member.member,
                name: res.body.name,
                role: member.role
              }
              setMembers(members => [...members, newMember])
            })
        })
        //end get current members
        //get request users
        res.body.joinMembers.map(user => {
          request.get(`/api/users/${user.user}`)
            .then(res => {
              let newRequest = {
                userID: user.user,
                name: res.body.name,
                role: user.role
              }
              setRequestUsers(requestUsers => [...requestUsers, newRequest])
            })
        })
      })
  }, [])
  console.log("members:", members);
  return (
    <>
      <h1>Manage Band</h1>
      <p>Name: {band.bandName}</p>
      <p>Owner: {bandOwner.name}</p>
      <div>members: {members.map(member => (
        <p>
          {member.name}:{member.role}
          <button onClick={() => console.log(member.userID)}>Remove Member</button>
        </p>
      ))}</div>
      <div>requests: {requestUsers.map(user => (
        <p>
          {user.name}:{user.role}
          <button
            onClick={() => {
              request.put("/api/band/accept")
                .send({
                  bandID,
                  user: user.name,
                  userID: user.userID,
                  role: user.role
                })
                .then(res => console.log(res.body))
            }}>
            Accept
                        </button>
          <button
            onClick={() => {
              console.log("deny:", user.userID)
              request.put("/api/band/reject")
                .send({
                  bandID,
                  user: user.name,
                  userID: user.userID,
                  role: user.role
                })
                .then(res => console.log(res.body))
            }}>
            Deny</button>
        </p>
      ))}</div>

    </>
  )
}