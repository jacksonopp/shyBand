import React, { useState, useEffect } from 'react';
import request from "superagent";

import { Link } from 'react-router-dom';

export default function ViewMessages() {
	const [messageThreads, setMessageThreads] = useState([]);
	const [currentUser, setCurrentUser] = useState({});
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
			setCurrentUser(user);
			threads = user.thread;
			// get all the threads info from Threads model
			setMessageThreads(threads);
		}
		getData();
	}, [])
	return (
		<>
			{messageThreads.map(thread => {
				let toUserName = "";
				if (thread.toUser._id === currentUser._id) {
					toUserName = thread.fromUser.name
				}

				return (
					<>
						<h5>{toUserName || thread.toUser.name}</h5>
						<p>{thread.messages[thread.messages.length - 1].message}</p>
						<Link to={`/viewMessage/${thread._id}`}>view thread</Link>
						<hr />
					</>
				)
			})}
		</>
	)
}