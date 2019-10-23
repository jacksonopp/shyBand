import React, { useEffect, useState } from 'react';

import request from "superagent";
import { Link } from 'react-router-dom';
import { Box } from 'grommet'
import { MailOption, Previous } from 'grommet-icons';

import Profile from "./Profile";

export default function UserProfile({ match }) {
  const id = match.params.id
  const [user, setUser] = useState({});
  const [instruments, setInstruments] = useState([]);
  const [band, setBand] = useState([]);
  const [genre, setGenre] = useState([]);
  const [userBands, setUserBands] = useState([]);
  // console.log("from userProfile:", userBands);


  useEffect(() => {
    request.get(`/api/users/${id}`)
      .then(res => {
        setUser(res.body);
        setInstruments(res.body.instruments);
        setBand(res.body.favoriteBands);
        setGenre(res.body.genre);
        setUserBands(res.body.bands)
      });
  }, [])
  return (
    <Box
      pad="medium"
      margin={{
        top: "7vh",
        bottom: "8vh"
      }}
    >
      <Link to="/browse"><Previous color="neutral-2" /></Link>


      <Profile
        userName={user.name}
        instruments={instruments}
        favBands={band}
        genres={genre}
        userBands={userBands}
        // TODO: im pretty sure showEdit is a security risk, so I want to go back and fix it
        showEdit={false}
        profPic={user.profilePic}
      />
      <Box
        direction="column"
        align="center"
      >
        <Link to={`/message/${user._id}`}>Send a message <MailOption color="neutral-2" /></Link>
      </Box>
    </Box>
  )
}
