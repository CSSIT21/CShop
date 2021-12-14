import { useMemo } from 'react';
import { Button, Typography } from '@mui/material';
import { noot, noop } from '~/common/utils';
import { nanoid } from 'nanoid';

const UploadButton = ({
	title = "Choose",
	Icon = noot,
	height = "42px",
	disabled = false,
	onUploadImg = noop,
}) => {
	const id = useMemo(() => nanoid(), []);

	return (
		<label htmlFor={disabled ? "text" : `outlined-button-file-${id}`}>
			<Button
				component="span"
				variant="outlined"
				startIcon={<>{Icon}</>}
				disabled={disabled}
				sx={{ height, borderWidth: "2px" }}
			>
				<input
					accept="image/*"
					id={`outlined-button-file-${id}`}
					type="file"
					style={{ display: 'none' }}
					onChange={onUploadImg}
				/>
				<Typography sx={{ textTransform: "capitalize" }}>
					{title}
				</Typography>
			</Button>
		</label>
	);
};

export default UploadButton;
