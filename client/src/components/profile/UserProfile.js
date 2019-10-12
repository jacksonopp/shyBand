import React, { useEffect, useState } from 'react';
import request from "superagent";

export default function UserProfile() {
	const id = window.location.href.slice(-24)
	const [user, setUser] = useState({});
	useEffect(() => {
		request.get(`/api/users/${id}`)
			.then(res => {
				console.log(res.body);
				setUser(res.body);
			});
	}, [])
	return (
		<>
			<p>user: {user.name}</p>
			<p>primary instrument: {user.primaryInstrument}</p>
		</>
	)
}