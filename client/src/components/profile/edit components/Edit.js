import React, { useState } from 'react';

import request from 'superagent';

import { Box, Button, TextInput } from 'grommet'
import { Edit as EditIcon, Update } from 'grommet-icons';

export default function Edit({ update }) {
	const token = localStorage.jwtToken.substr(7)
	const [displayEdit, setDisplayEdit] = useState(false);
	const [value, setValue] = useState("")
	return (
		<>
			<Box
				margin={{
					top: "small"
				}}
			>
				<EditIcon size="small"
					onClick={() => {
						displayEdit ? setDisplayEdit(false) : setDisplayEdit(true)
					}}
				/>
				{displayEdit &&
					<Box gap="xsmall">
						<TextInput
							placeholder="a url to your picture"
							value={value}
							onChange={(e) => { setValue(e.target.value) }}
						/>
						<Button
							label="submit"
							onClick={e => {
								e.preventDefault();
								request.put(`/api/user/${token}`)
									.send({
										profilePic: value
									})
									.then(res => {
										setDisplayEdit(false);
										update();
									})
							}}
						/>
					</Box>
				}
			</Box>
		</>
	)
}