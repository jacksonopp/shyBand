import React, { useState } from 'react';

import request from 'superagent'

import { Add as AddIcon } from "grommet-icons";
import { TextInput, Button, Box } from 'grommet';


export default function Add({ category, update }) {
  const token = localStorage.jwtToken.substr(7)
  const [display, setDisplay] = useState(false);
  const [value, setValue] = useState("")
  return (
    <>
      <Box
        background="status-ok"
        round="full"
      >
        <AddIcon

          color="light-1"
          onClick={() => {
            display ? setDisplay(false) : setDisplay(true)
          }}
        />
      </Box>
      {display &&
        <Box>
          <TextInput
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <Button
            label="submit"
            onClick={
              e => {
                e.preventDefault();
                switch (category) {
                  case "instrument":
                    request.put(`/api/user/${token}`)
                      .send({
                        primaryInstrument: value
                      })
                      .then(res => {
                        setDisplay(false);
                        // console.log(res.body)
                        update();
                      })
                    break;
                  case "bands":
                    request.put(`/api/user/${token}`)
                      .send({
                        favBand: value
                      })
                      .then(res => {
                        setDisplay(false);
                        update();
                      })
                    break;
                  case "genre":
                    setDisplay(false);
                    request.put(`/api/user/${token}`)
                      .send({
                        genre: value
                      })
                      .then(res => {
                        setDisplay(false);
                        update();
                      })
                    break;
                  default:
                    setDisplay(false);
                }
              }
            }
          />
        </Box>}
    </>
  )
}