import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <span>navbar
        <Link to="/dashboard"> dashboard</Link>
        <Link to="/profile"> profile</Link>
        <Link to="/browse"> browse</Link>
        <Link to="/updateBio"> bio</Link>
      </span>
    );
  }
}

export default Navbar;
