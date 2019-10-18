import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Box } from 'grommet';
import { Chat, Home } from 'grommet-icons';

class Navbar extends Component {
  render() {
    return (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='light-2'
        pad={{ vertical: 'small', horizontal: 'medium' }}
        elevation='medium'
      >
        <Link to="/dashboard" > <Home color="neutral-2" /></Link>
        <Link to="/profile"> profile</Link>
        <Link to="/browse"> browse</Link>
        <Link to="/viewMessage"> <Chat color="neutral-2" /></Link>
        <Link to="/createBand"> create a band</Link>
        <Link to="/settings"> settings</Link>
      </Box >
    );
  }
}

export default Navbar;
