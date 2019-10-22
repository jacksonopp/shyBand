import React, { useState } from 'react';


import { Box, Button, TextInput } from 'grommet'
import { Edit as EditIcon } from 'grommet-icons';

export default function Edit() {
	const [displayEdit, setDisplayEdit] = useState(false);
	const [value, setValue] = useState("")
	return (
		<>
			<EditIcon size="small"
				onClick={() => {
					displayEdit ? setDisplayEdit(false) : setDisplayEdit(true)
				}}
			/>
			{displayEdit &&
				<Box gap="xsmall">
					<TextInput
						value={value}
						onChange={(e) => { setValue(e.target.value) }}
					/>
					<Button
						label="submit"
					/>
				</Box>
			}
		</>
	)
}