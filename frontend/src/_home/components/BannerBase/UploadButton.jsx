// import { useState } from 'react';
import Button from '@mui/material/Button';
import { noot, noop } from '~/common/utils';

const UploadButton = ({
	title = 'Upload',
	Icon = noot,
	height = "42px",
	onUploadImg = noop,
	disabled = false,
}) => {
	console.log(onUploadImg);
	return (
		<label htmlFor={disabled ? "text" : "outlined-button-file"}>
			<Button
				component="span"
				variant="outlined"
				startIcon={<>{Icon}</>}
				disabled={disabled}
				sx={{ height, borderWidth: "2px" }}
			>
				<input
					accept="image/*"
					id="outlined-button-file"
					type="file"
					style={{ display: 'none' }}
					onChange={onUploadImg}
				/>
				{title}
			</Button>
		</label>
	);
};

export default UploadButton;
