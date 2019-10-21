import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import { Box, Text, Heading, TextInput, Button } from 'grommet';
import { Previous, Music } from 'grommet-icons'


class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
          pad="xlarge"
          // width="medium"
          elevation="medium"
          round="4px">
          <Link to="/" >
            <Previous color="neutral-2" />
          </Link>
          <Box>
            <Heading>
              Register below
            </Heading>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </Box>
          <form noValidate onSubmit={this.onSubmit}>
            <Box
              gap="xsmall"
            >
              <TextInput
                placeholder="name"
                aria-label="name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })}
              />
              <span className="red-text">{errors.name}</span>

              <TextInput
                placeholder="email"
                aria-label="email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email
                })}
              />
              <span className="red-text">{errors.email}</span>

              <TextInput
                placeholder="password"
                aria-label="password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password
                })}
              />
              <span className="red-text">{errors.password}</span>

              <TextInput
                placeholder="confirm password"
                aria-label="confirm password"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2
                })}
              />
              <span className="red-text">{errors.password2}</span>

              <Button
                icon={<Music color="neutral-2" />}
                label="register"
                type="submit"
                color="neutral-2"
              />
            </Box>
          </form>
        </Box>
      </Box>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
