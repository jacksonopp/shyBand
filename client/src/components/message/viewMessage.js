import React, { useState, useEffect } from 'react';
import request from "superagent";

import { Link } from 'react-router-dom';

export default function ViewMessages() {
	const [messageThreads, setMessageThreads] = useState([]);
	useEffect(async function () {
		const token = localStorage.jwtToken.substr(7);
		//get current user
		let user = "";
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
		await request.get(`api/thread/`)
			.then(res => {
				console.log(res.body);
			})
		setMessageThreads(threads);
	}, [])
	return (
		<>
			{messageThreads.map(thread => {
				return (
					<>
						<p>{thread._id}</p>
						<p>with user: {thread.messages[0].fromUser}</p>
						<p>message: {thread.messages[0].message}</p>
					</>
				)
			})}
		</>
	)
}