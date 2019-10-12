import React from 'react';

export default function Profile({ userName, primaryInstrument }) {
	return (
		<>
			<p>user: {userName}</p>
			<p>primary instrument: {primaryInstrument}</p>
		</>
	)
}