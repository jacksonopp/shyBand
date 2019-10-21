import React, { useState } from 'react';

import { Box, Button, TextInput } from 'grommet'
import { Send } from 'grommet-icons';

import request from "superagent";

export default function MessageInput({ threadId, currentUserId, currentUserName, toUserId, refresh }) {
  const [message, setMessage] = useState("");
  return (
    <Box
      direction="row"
      margin={{
        bottom: "small",
        right: "medium"
      }}
      pad={{
        top: "small"
      }}
      align="center"
    >

      <TextInput
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button
        icon={<Send color="neutral-2" />}
        onClick={() => {
          request.post(`/api/thread/${threadId}`)
            .send({
              message,
              fromUser: currentUserId,
              toUser: toUserId,
              threadId
            })
            .then(res => setMessage(""));
        }}
      />
    </Box >
  )
}