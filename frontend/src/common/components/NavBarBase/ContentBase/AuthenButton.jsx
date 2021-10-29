import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CButton from '../../CButton';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	authenWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		minWidth: '200px',
		margin: '0 15px',
	},
});

const authenProps = {
	component: Link,
	width: '90px',
	height: '38px',
	fontSize: '14px',
};
const style = {
	border: '1px solid #FD6637',
	backgroundColor: 'white',
	color: '#FD6637',
};

const AuthenButton = () => {
	const classes = useStyles();

	return (
		<Box className={classes.authenWrapper}>
			<CButton
				to="/login"
				title="Sign In"
				{...authenProps}
				style={style}
			/>
			<CButton
				to="/register"
				title="Sign Up"
				{...authenProps} />
		</Box>
	);
};

export default AuthenButton;

