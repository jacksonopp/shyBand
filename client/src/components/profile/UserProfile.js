import React, { useEffect, useState } from 'react';
import request from "superagent";

import Profile from "./Profile";

export default function UserProfile() {
	const id = window.location.href.slice(-24)
	const [user, setUser] = useState({});
	const [instruments, setInstruments] = useState([]);
	const [band, setBand] = useState([]);
	const [genre, setGenre] = useState([]);


	useEffect(() => {
		request.get(`/api/users/${id}`)
			.then(res => {
				console.log(res.body);
				setUser(res.body);
				setInstruments(res.body.instruments);
				setBand(res.body.favoriteBands ? res.body.favoriteBands : ["none set yet"]);
				setGenre(res.body.genre);
			});
	}, [])
	return (
		<>
			<Profile userName={user.name} instruments={instruments} favBands={band} genres={genre} />
		</>
	)
}