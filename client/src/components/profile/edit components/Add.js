import React, { useState } from 'react';

import request from 'superagent'

import { Add as AddIcon } from "grommet-icons";
import { TextInput, Button, Box } from 'grommet';


export default function Add() {
  const [display, setDisplay] = useState(false);
  const [value, setValue] = useState("")
  return (
    <>
      <AddIcon
        size="small"
        onClick={() => {
          display ? setDisplay(false) : setDisplay(true)
        }}
      />
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

              }
            }
          />
        </Box>}
    </>
  )
}