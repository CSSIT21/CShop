import {
	Button,
	Grid,
	Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import CButton from '../../common/components/CButton';
import ProductCard from '../../common/components/ProductCard';
import { For } from '../../common/utils/index';

const useStyles = makeStyles({
	suggestionWrapper: {
		backgroundColor: '#F4F5F6',
		padding: '50px 245px',
	},
	
	suggestionHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 30,
		
		'& a': {
			fontWeight: 'bold',
			textTransform: 'capitalize',
			fontSize: 16,
		},
	},
});

const SuggestionSection = ({ suggestItems, onFavourite }) => {
	const [items] = useState(suggestItems);
	const classes = useStyles();
	
	return (
			<Box className={classes.suggestionWrapper}>
				<Box className={classes.suggestionHeader}>
					<Typography component="h3" fontSize="30px" fontWeight="bold">
						Suggestions
					</Typography>
					
					<Button
							href="/home/suggest"
							className={classes.suggestionButton}
							color="primary"
					>
						Show all{' '}
					</Button>
				</Box>
				
				<Grid container spacing={2} mb={5}>
					<For
							each={items}
							children={(item, idx) => (
									<Grid item xs={6} md={3} mb={3} key={idx}>
										<ProductCard
												product={item}
												onFavourite={onFavourite}
												to="/product/1"
										/>
									</Grid>
							)}
					/>
				</Grid>
				
				<Box display="flex" justifyContent="center">
					<CButton title="Show more products" height="40px" />
				</Box>
			</Box>
	);
};

export default SuggestionSection;
