import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Box } from 'grommet';
import { Chat, Home, Search, Menu } from 'grommet-icons';

import "./navbar.css"

class Navbar extends Component {
  render() {
    return (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='left'
        background='light-2'
        pad={{ vertical: 'medium', horizontal: 'medium' }}
        elevation='medium'

      >
        <Link to="/dashboard"><Menu color="neutral-2" /></Link>

        <Box
          direction="row"
          align="center"
          justify="center"
          fill="horizontal"
          gap="20vw"
        >
          <Link to="/browse"> <Search color="neutral-2" /></Link>
          <Link to="/viewMessage"> <Chat color="neutral-2" /></Link>
          <Link to="/dashboard" > <Home color="neutral-2" /></Link>
        </Box>

      </Box >
    );
  }
}

export default Navbar;
