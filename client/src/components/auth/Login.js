import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import { Box, Heading, Text, TextInput, Button } from 'grommet'
import { Previous, Music } from 'grommet-icons'


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Box
        align="center"
        pad={{
          top: "100px"
        }}>
        <Box
          align="center"
          border={{
            color: "neutral-2",
            size: "small"
          }}
          pad="large"
          // width="medium"
          elevation="medium"
          round="4px"
        >

          <Link to="/">
            <Previous color="neutral-2" />
            <Text alignSelf="end" color="neutral-2">Back to home</Text>
          </Link>

          <div>
            <Heading level='2'>
              <b>Login</b> below
            </Heading>
            <p>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <Box gap="xsmall">
              <TextInput
                placeholder="email"
                aria-label="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })} />
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
              <TextInput
                placeholder="password"
                aria-label="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })} />
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </Box>

            <Box
              align="center"
              pad={{
                top: "small"
              }}
            >
              <Button
                icon={<Music color="neutral-2" />}
                label="login"
                a11yTitle="login"
                type="submit"
                color="neutral-2"
                alignSelf="center" />
            </Box>
          </form>
        </Box>
      </Box>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
