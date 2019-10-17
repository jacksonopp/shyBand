import React from 'react';

import { Link } from 'react-router-dom';


export default function Profile({ userName, instruments, favBands, genres, userBands }) {
	return (
		<>
			<p>user: {userName}</p>
			<div>instruments: {instruments.map(instrument => (
				<p key={instrument.instrument}>{instrument.instrument} </p>
			))}
			</div>
			<div>favorite bands: {favBands.map(band => (
				<p key={band.bandName}>{band.bandName} </p>
			))}
			</div>
			<div>genres: {genres.map(genre => (
				<p key={genre.genre}>{genre.genre} </p>
			))}</div>
			<div>user bands: {userBands.map(band => (
				<p key={band.bandName}><Link to={`/band/${band._id}`}>{band.bandName}</Link></p>
			))}</div>
		</>
	)
}