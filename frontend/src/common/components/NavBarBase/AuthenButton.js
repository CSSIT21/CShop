import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CButton from '../CButton';

const useStyles = makeStyles({
	authenWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		minWidth: '200px',
		margin: '0 15px',
	},
})

const AuthenButton = () => {
	const classes = useStyles();

	return (
		<Box className={classes.authenWrapper}>
			<CButton title="Sign In" width="90px" height="38px" fontSize="14px" style={{ border: "1px solid #FD6637", backgroundColor: "white", color: "#FD6637" }} />
			<CButton title="Sign Up" width="90px" height="38px" fontSize="14px" />
		</Box>
	)
}

export default AuthenButton;

