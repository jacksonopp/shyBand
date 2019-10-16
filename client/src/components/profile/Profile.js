import React from 'react';

import { Link } from 'react-router-dom';


export default function Profile({ userName, instruments, favBands, genres, userBands }) {
	// console.log(userBands);
	return (
		<>
			<p>user: {userName}</p>
			<p>instruments: {instruments.map(instrument => (
				<span>{instrument.instrument} </span>
			))}
			</p>
			<p>favorite bands: {favBands.map(band => (
				<span>{band.bandName} </span>
			))}
			</p>
			<p>genres: {genres.map(genre => (
				<span>{genre.genre} </span>
			))}</p>
			<p>user bands: {userBands.map(band => (
				<Link to={band._id}>{band.bandName}</Link>
			))}</p>
		</>
	)
}