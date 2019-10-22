import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

import { Box, Text } from 'grommet';
import { Dashboard as DashboardIcon, User as UserIcon, Search, ChatOption, Music, Configure, Logout } from 'grommet-icons';

import "./dashboard.css"


class Dashboard extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.update();
	};

	render() {
		const { user } = this.props.auth;

		return (

			<Box
				pad={{
					left: "medium",
					right: "medium",
					top: "5vh"
				}}
				// margin={{
				// 	top: "xlarge"
				// }}
				background="light-2"
				height="100vh"
				width={{
					min: "188px",
					max: "32vw"
				}}
				elevation="medium"
			>
				<Link to="/dashboard" onClick={() => this.props.update()}>
					<Box direction="row" align="center" margin={{ top: "small", bottom: "small" }} gap="small">
						<DashboardIcon color="neutral-2" />
						<Text margin="none">dashboard</Text>
					</Box>
				</Link>
				<Link to="/profile" onClick={() => this.props.update()}>
					<Box direction="row" align="center" margin={{ top: "small", bottom: "small" }} gap="small">
						<UserIcon color="neutral-2" />
						<Text>my profile</Text>
					</Box>
				</Link>
				<Link to="/browse" onClick={() => this.props.update()}>
					<Box direction="row" align="center" margin={{ top: "small", bottom: "small" }} gap="small">
						<Search color="neutral-2" />
						<Text>browse</Text>
					</Box>
				</Link>
				<Link to="/viewMessage" onClick={() => this.props.update()}>
					<Box direction="row" align="center" margin={{ top: "small", bottom: "small" }} gap="small">
						<ChatOption color="neutral-2" />
						<Text>view messages</Text>
					</Box>
				</Link>
				<Link to="/createBand" onClick={() => this.props.update()}>
					<Box direction="row" align="center" margin={{ top: "small", bottom: "small" }} gap="small">
						<Music color="neutral-2" />
						<Text>create a band</Text>
					</Box>
				</Link>
				<Link to="/settings" onClick={() => this.props.update()}>
					<Box direction="row" align="center" margin={{ top: "small", bottom: "small" }} gap="small">
						<Configure color="neutral-2" />
						<Text>settings</Text>
					</Box>
				</Link>
				<Link to="#" onClick={this.onLogoutClick}>
					<Box direction="row" align="center" margin={{ top: "small", bottom: "small" }} gap="small">
						<Logout color="neutral-2" />
						<Text>log out</Text>
					</Box>
				</Link>
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
