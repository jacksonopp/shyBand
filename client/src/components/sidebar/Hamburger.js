import React, { useState } from 'react';

import { Menu } from 'grommet-icons'

import Sidebar from "../sidebar/Sidebar";

export default function Hamburger() {
	const [isDisplay, setIsDisplay] = useState(false)
	return (
		<>
			<div
				className="hamburger"
				onClick={() => {
					isDisplay ? setIsDisplay(false) : setIsDisplay(true)
				}}

			>
				<Menu color="neutral-2" />
			</div>
			{isDisplay && <Sidebar update={() => setIsDisplay(false)} />}
		</>
	)
}