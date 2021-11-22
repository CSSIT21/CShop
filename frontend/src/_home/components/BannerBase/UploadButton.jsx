import { useMemo } from 'react';
import Button from '@mui/material/Button';
import { noot, noop } from '~/common/utils';
import { nanoid } from 'nanoid';

const UploadButton = ({
	title = 'Upload',
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
					onInput={onUploadImg}
				/>
				{title}
			</Button>
		</label>
	);
};

export default UploadButton;
