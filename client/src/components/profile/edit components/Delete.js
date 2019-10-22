import React, { useState } from 'react';

import { FormSubtract } from 'grommet-icons';
import { Box } from 'grommet'

export default function Delete({ item }) {
  const [display, setDisplay] = useState(false)
  return (
    <>

      <Box
        background='status-critical'
        round="full"
        onClick={() => { alert(item) }}
      >
        <FormSubtract
          size="small"
          color="light-1"
        />
      </Box>
    </>
  )
}