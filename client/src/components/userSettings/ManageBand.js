import React, { useState, useEffect } from 'react';

import request from 'superagent';
// const bandID = window.location.href.substr(-24);

function apiGetBand(bandID, setBandCB, setBandOwnerCB, setMembersCB, setRequestsCB) {
  request.get(`/api/band/${bandID}`)
    .then(res => {
      // console.log("this is the current band:", res.body);
      setBandCB(res.body)
      setBandOwnerCB(res.body.bandOwner)
      // get current members

      setMembersCB([]);
      res.body.bandMembers.forEach(member => {
        apiGetMembers(member, setMembersCB)
      })
      //get all requests
      setRequestsCB([])
      res.body.joinMembers.forEach(user => {
        apiGetRequests(user, setRequestsCB)
      })
    })
}

function apiGetMembers(input, setMembersCB) {
  // console.log(input);
  request.get(`/api/users/${input.member}`)
    .then(res => {
      let newUser = {
        userID: input.member,
        name: res.body.name,
        role: input.role
      }
      setMembersCB(existingMembers => [...existingMembers, newUser])
    })

}

function apiGetRequests(input, setRequestsCB) {
  let user = {}
  request.get(`/api/users/${input.user}`)
    .then(res => {
      let newUser = {
        userID: input.user,
        name: res.body.name,
        role: input.role
      }
      setRequestsCB(existingRequests => [...existingRequests, newUser])
    })
  return user;
}



export default function ManageBand({ match }) {
  const [band, setBand] = useState({});
  const [bandOwner, setBandOwner] = useState({});
  const [members, setMembers] = useState([]);
  const [requestUsers, setRequestUsers] = useState([]);
  const bandID = match.params.id;
  useEffect(() => {
    apiGetBand(bandID, setBand, setBandOwner, setMembers, setRequestUsers);
  }, [])
  return (
    <>
      <h1>Manage Band</h1>
      <p>Name: {band.bandName}</p>
      <p>Owner: {bandOwner.name}</p>
      <div>members: {members.map(member => (
        <p key={member.name}>
          {/* {member.name} */}
          {member.name}:{member.role}
          <button onClick={() => {
            request.delete("/api/band/delete")
              .send({
                bandID,
                userID: member.userID
              })
              .then(res => {
                apiGetBand(setBand, setBandOwner, setMembers, setRequestUsers)
                console.log(res.body)
              });
          }}>Remove Member</button>
        </p>
      ))}</div>
      <div>requests: {requestUsers.map(user => (
        <p key={user.name}>
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
                .then(res => {
                  console.log(res.body)
                  apiGetBand(setBand, setBandOwner, setMembers, setRequestUsers);
                })
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