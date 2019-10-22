import React, { Component } from "react";

import { Box, Heading, Button } from "grommet";

class Landing extends Component {
  render() {
    return (
      <Box
        align="center"
        pad={{
          top: "100px"
        }}>
        <Box align="center" gap="small">
          <Heading level="1">
            Welcome to Shy Band!
          </Heading>
          <Button
            label="register"
            a11yTitle="login"
            color="neutral-2"
            alignSelf="center"
            onClick={() => this.props.history.push("/register")}
          />

          <Button
            label="login"
            a11yTitle="login"
            onClick={() => this.props.history.push("/login")}
            color="neutral-2"
            alignSelf="center" />
        </Box>
      </Box>
    );
  }
}

export default Landing;
