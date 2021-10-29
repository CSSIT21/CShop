import { makeStyles } from '@mui/styles';
import { Avatar } from '@mui/material';
import { Box } from '@mui/system';
import DropdownDetail from './DropdownDetail';
import { useRecoilValue } from 'recoil';
import authState from '../../store/authState';

const AccountDropdown = () => {
	const classes = useStyles();
	const auth = useRecoilValue(authState);

	return (
		<Box className={classes.account}>
			<DropdownDetail >
				<span className={classes.accountName}>{auth.user.first_name} </span>
				<Avatar src={auth.user.url} sx={{ width: 30, height: 30 }} />
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