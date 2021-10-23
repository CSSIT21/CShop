import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Fab } from '@mui/material';
import { Box } from '@mui/system';
import { For } from '../../utils';

const buttonStyle = {
	background: 'none',
	boxShadow: 'none',
	marginRight: 1,
};

const actionLists = [
	{
		label: "chat",
		icon: ChatOutlinedIcon,
	},
	{
		label: "notification",
		icon: NotificationsNoneIcon,
	},
	{
		label: "cart",
		icon: ShoppingCartOutlinedIcon,
	}
];

const ActionMenu = () => {

	return (
		<>
			<Box display="flex">
				<For each={actionLists}>{(Action, index) =>
					<Fab size="small" sx={buttonStyle} aria-label={Action.label} key={index}>
						<Action.icon />
					</Fab>
				}</For>

			</Box>
		</>
	)
}

export default ActionMenu;