import React, { useState, useEffect } from 'react';
import request from "superagent";

import { Box, Button, Heading, TextInput, Form } from 'grommet';

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
    <Box
      margin={{
        top: "7vh"
      }}
      pad="medium"
    >
      <Heading>Update Bio</Heading>
      <Form>
        <Box
          gap="small"
        >
          <label for="primaryIns">Primary Instrument</label>
          <TextInput
            placeholder="instrument"
            aria-label="instrument"
            value={primaryInstrument}
            onChange={e => setPrimaryInstrument(e.target.value)}
          />
          <label for="primaryIns">Favorite Bands</label>
          <TextInput
            placeholder="favorite band"
            aria-label="favorite band"
            value={favBand}
            onChange={e => setFavBand(e.target.value)}
          />
          <label for="primaryIns">Genre</label>
          <TextInput
            placeholder="genre"
            aria-label="genre"
            value={genre}
            onChange={e => setGenre(e.target.value)}
          />
          <Button
            label="submit"
            alignSelf="center"
            margin={{
              top: "small"
            }}
            onClick={
              e => {
                e.preventDefault();
                request.put(`/api/user/${userToken}`)
                  .send({
                    primaryInstrument,
                    favBand,
                    genre
                  })
                  .then(res => {
                    console.log(res.body)
                    window.location.href = `/profile`
                  })
                  .catch(err => console.log(err))
              }
            }
          />
        </Box>
      </Form>
    </Box>
  )
}