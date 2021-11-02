import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Fab } from '@mui/material';
import { Box } from '@mui/system';
import { For } from '~/common/utils';

const buttonStyle = {
	background: 'none',
	boxShadow: 'none',
	marginRight: 1,
};

const actionLists = [
	{
		label: "chat",
		icon: ChatOutlinedIcon,
		value: 3
	},
	{
		label: "notification",
		icon: NotificationsNoneIcon,
		value: 5
	},
	{
		label: "cart",
		icon: ShoppingCartOutlinedIcon,
		value: '66+'
	}
];

const ActionMenu = () => {

	return (
		<>
			<Box display="flex">
				<For each={actionLists}>{({ label, icon: ActionIcon, value }, index) =>
					<Fab size="small" sx={buttonStyle} aria-label={label} key={index}>
						<Badge badgeContent={value} color="primary">
							<ActionIcon />
						</Badge>
					</Fab>
				}</For>
			</Box>
		</>
	)
}

export default ActionMenu;