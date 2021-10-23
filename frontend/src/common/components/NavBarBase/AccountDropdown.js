import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import DropdownDetail from './DropdownDetail';

const AccountDropdown = () => {
	const classes = useStyles();

	const username = 'Firstname';
	const url = "https://cdn.discordapp.com/attachments/681542997946794044/888113518182805614/unknown.png";

	return (
		<Box className={classes.account}>
			<DropdownDetail >
				<span className={classes.accountName}>{username} </span>
				<Avatar src={url} sx={{ width: 30, height: 30 }} />
			</DropdownDetail>
		</Box>
	)
}

const useStyles = makeStyles({
	account: {
		display: 'flex',
		alignItems: 'center'
	},
	accountName: {
		width: '100%',
		paddingRight: 10,
		color: 'black',

		textTransform: 'capitalize',
		fontWeight: 500,
	},
})

export default AccountDropdown;