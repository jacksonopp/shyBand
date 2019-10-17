import React, { useState, useEffect } from 'react';

import request from "superagent";

export default function BandProfile() {
  const [bandId, setBandId] = useState("");
  const [bandName, setBandName] = useState("");
  const [members, setMembers] = useState([]);
  const [joinInst, setJoinInst] = useState("");
  const id = window.location.href.substr(-24);


  useEffect(() => {
    request.get(`/api/band/${id}`)
      .then(res => {
        setBandName(res.body.bandName);
        setBandId(res.body._id);
        console.log("bands:", res.body)
        res.body.bandMembers.map(member => {
          request.get(`/api/users/${member.member}`)
            .then(res => {
              let newMember = {
                userID: member.member,
                name: res.body.name,
                role: member.role
              }
              console.log("newMember:", newMember);
              console.log("members name:", res.body.name);
              setMembers(members => [...members, newMember]);
            })
        })
      })

  }, [])
  const token = localStorage.jwtToken.substr(7)
  return (
    <>
      <h1>{bandName}</h1>
      <h3>Members</h3>
      <div>{members.map(member => {
        return <p>{member.name}:{member.role}</p>
      }
      )}</div>
      <h3>Want to join this band?</h3>
      <label for="instrument">What instrument do you play?</label>
      <input id="instrument" value={joinInst} onChange={e => setJoinInst(e.target.value)} />

      <button onClick={e => {
        e.preventDefault();
        console.log(bandId);
        request.post(`/api/band/join/${bandId}`)
          .send({
            joinInst,
            token
          })
          .then(res => console.log(res.body))
      }}>request to join</button>
    </>
  )
}