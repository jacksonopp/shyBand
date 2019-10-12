import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <span>navbar <Link to="/proflie">profile</Link></span>
    );
  }
}

export default Navbar;
