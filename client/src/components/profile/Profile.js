import React from 'react';

export default function Profile({ userName, instruments, favBands, genres }) {
	return (
		<>
			<p>user: {userName}</p>
			<p>instruments {instruments.map(instrument => (
				<span>{instrument.instrument} </span>
			))}
			</p>
			<p>favorite bands {favBands.map(band => (
				<span>{band.bandName} </span>
			))}
			</p>
			<p>genres: {genres.map(genre => (
				<span>{genre.genre} </span>
			))}</p>

		</>
	)
}