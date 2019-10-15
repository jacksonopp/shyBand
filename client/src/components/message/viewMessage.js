import React, { useState, useEffect } from 'react';
import request from "superagent";

import { Link } from 'react-router-dom';

export default function ViewMessages() {
	const [messageThreads, setMessageThreads] = useState([]);
	useEffect(() => {
		const token = localStorage.jwtToken.substr(7);
		//get current user
		let user = "";
		async function getData() {
			await request.get(`/api/user/${token}`)
				.then(res => {
					user = res.body;
				});
			// pull out all user's threads
			let threads = [];
			console.log("user", user);
			threads = user.thread;
			console.log("threads:", threads);
			// get all the threads info from Threads model
			setMessageThreads(threads);
		}
		getData();
	}, [])
	return (
		<>
			{messageThreads.map(thread => {

				return (
					<>
						<p>{thread._id}</p>
						<p>with user: {thread.toUser.name}</p>
						<p>You: {thread.fromUser.name}</p>
						<p>message: {thread.messages[0].message}</p>
						<Link to={`/viewMessage/${thread._id}`}>view thread</Link>
					</>
				)
			})}
		</>
	)
}