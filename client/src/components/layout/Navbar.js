import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Box } from 'grommet';
import { ChatOption, Home, Search, Menu, Music } from 'grommet-icons';

import "./navbar.css"
import SideBar from '../sidebar/Sidebar';

export default function Navbar() {
  const [isMenuDisplay, setIsMenuDisplay] = useState(false)
  return (
    <>
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='stretch'
        background={'light-2'}
        pad={{ vertical: 'medium', horizontal: 'medium' }}
        elevation='medium'
        height="50px"
      >
        {/* <Box
          direction="row"
          align="center"
        >
          <Menu
            color="neutral-2"
            onClick={() => {
              isMenuDisplay ? setIsMenuDisplay(false) : setIsMenuDisplay(true)
            }}
          />
        </Box> */}

        <Box
          direction="row"
          align="center"
          justify="center"
          fill="horizontal"
          gap="20vw"
        >
          <Link to="/dashboard" ><Home color="neutral-2" /></Link>
          <Link to="/browse"><Search color="neutral-2" /></Link>
          <Link to="/viewMessage"><ChatOption color="neutral-2" /></Link>
        </Box>

      </Box >
      {/* {isMenuDisplay && <SideBar update={() => setIsMenuDisplay(false)} />} */}
    </>
  );
}