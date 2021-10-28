import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import CButton from '../CButton';

const Search = () => {
	const classes = useStyles();
	
	return (
			<>
				<Box className={classes.searchBox}>
					<SearchIcon sx={{ color: '#A0A3BD' }} />
					<input
							className={classes.searchInput}
							placeholder="What are you looking for?"
					/>
					<CButton title="Search" width="90px" height="38px" />
				</Box>
			</>
	);
};

const useStyles = makeStyles({
	searchBox: {
		width: '100%',
		height: 46,
		position: 'relative',
		padding: '0px 6px 0px 20px',
		
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
		
		borderRadius: 10,
		backgroundColor: '#ECECEE',
		transition: 'all ease 0.125s',
		
		'&:focus-within': {
			boxShadow: '1px 2px 4px rgb(0,0,0,0.2)',
		},
	},
	searchInput: {
		width: '100%',
		padding: 5,
		
		color: '#A0A3BD',
		border: 'none',
		backgroundColor: 'transparent',
		
		'&:focus': {
			outline: 'none',
			color: 'black',
		},
	},
});

export default Search;
