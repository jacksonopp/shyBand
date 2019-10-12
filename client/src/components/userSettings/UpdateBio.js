import React, { useState } from 'react';

export default function UpdateBio() {
  const [primaryInstrument, setPrimaryInstrument] = useState("")
  return (
    <>
      <h1>Update Bio</h1>
      <form>
        <input type="text" value={primaryInstrument} onChange={e => setPrimaryInstrument(e.target.value)} />
      </form>
    </>
  )
}