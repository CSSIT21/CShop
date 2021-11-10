import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)((props) => {
	return {
		width: props.width || "100%",
		height: props.height || 10,
		borderRadius: 5,
		[`& .${linearProgressClasses.colorPrimary}`]: {
			backgroundColor: props.customColor || "primary",
		},
		[`& .${linearProgressClasses.bar}`]: {
			borderRadius: 5,
			backgroundColor: props.customColor || "primary",
		}
	};
});
export default BorderLinearProgress;