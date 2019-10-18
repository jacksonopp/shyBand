import React, { useEffect, useState } from 'react';
import request from "superagent";
import { Link } from 'react-router-dom';

import Profile from "./Profile";

export default function UserProfile({ match }) {
	const id = match.params.id
	const [user, setUser] = useState({});
	const [instruments, setInstruments] = useState([]);
	const [band, setBand] = useState([]);
	const [genre, setGenre] = useState([]);
	const [userBands, setUserBands] = useState([]);
	// console.log("from userProfile:", userBands);


	useEffect(() => {
		request.get(`/api/users/${id}`)
			.then(res => {
				setUser(res.body);
				setInstruments(res.body.instruments);
				setBand(res.body.favoriteBands);
				setGenre(res.body.genre);
				setUserBands(res.body.bands)
			});
	}, [])
	return (
		<>
			<Profile
				userName={user.name}
				instruments={instruments}
				favBands={band}
				genres={genre}
				userBands={userBands} />
			<Link to={`/message/${user._id}`}>Send a message</Link>
		</>
	)
}
// <Profile userName={user.name} instruments={instruments} favBands={band} genres={genre} userId={id} />