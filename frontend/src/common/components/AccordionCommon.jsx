import { ExpandMoreRounded } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Divider,
	Fade,
	Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { noop } from '../utils';

const AccordionCommon = ({
	title = null,
	subTitle = null,
	timeout = 250,
	children,
	open = false,
	setOpen = noop,
	summaryProps = {},
	typographyProps = {},
	detailProps = {},
	col = false,
	...rest
}) => {
	const classes = useStyles();
	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<Box sx={{ width: '100%' }}>
			<Accordion
				className={classes.accordion}
				TransitionProps={{ onExited: () => setOpen(false), timeout: 700 }}
				disableGutters
				defaultExpanded={open}
				{...rest}
			>
				<AccordionSummary
					expandIcon={<ExpandMoreRounded />}
					aria-controls="expand-comment"
					id="expand-comment"
					onClick={handleClick}
					{...summaryProps}
				>
					<Box className={classes.box}>
						<Typography
							sx={{ fontWeight: 600, fontSize: '24px', marginBottom: '8px' }}
							{...typographyProps}
						>
							{title}
						</Typography>
						<Typography
							sx={{ fontWeight: 400, fontSize: '16px', color: '#A0A3BD' }}
							{...typographyProps}
						>
							{subTitle}
						</Typography>
					</Box>
				</AccordionSummary>
				<AccordionDetails {...detailProps}>
					<Fade in={open} timeout={timeout}>
						<Box className={col ? classes.col : classes.row}>{children}</Box>
					</Fade>
				</AccordionDetails>
			</Accordion>
			<Divider />
		</Box>
	);
};
const useStyles = makeStyles({
	box: {
		display: 'flex',
		alignItems: 'flex-start',
		padding: '25px 0px',
		flexDirection: 'column',
	},
	row: {
		padding: '0px 0px 30px 0px',
	},
	col: {
		display: 'flex',
		padding: '0px 0px 30px 0px',
	},
	accordion: {
		boxShadow: 'none !important',
		border: '0px solid !important',
		'&:before': {
			display: 'none',
		},
	},
});

export default AccordionCommon;
