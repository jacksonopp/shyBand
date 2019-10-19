import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import { Box } from 'grommet';


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Box
        pad={{
          left: "medium",
          right: "medium"
        }}
      >
        <h4>
          <b>Hey there,</b> {user.name.split(" ")[0]}
          <p className="flow-text grey-text text-darken-1">
            You are logged into a full-stack{" "}
            <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
            </p>
        </h4>
        <Link to="/dashboard" >dashboard</Link>
        <Link to="/profile">profile</Link>
        <Link to="/browse">browse</Link>
        <Link to="/viewMessage">view messages</Link>
        <Link to="/createBand">create a band</Link>
        <Link to="/settings">settings</Link>
        <Link to="#" onClick={this.onLogoutClick}>logout</Link>
      </Box>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
