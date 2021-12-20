import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, Fab } from '@mui/material';
import { Box } from '@mui/system';
import { For } from '~/common/utils';
import { useHistory } from 'react-router-dom';

const actionLists = [
	{
		label: "chat",
		icon: ChatOutlinedIcon,
		value: 3,
		path: '/chat'
	},
	{
		label: "notification",
		icon: NotificationsNoneIcon,
		value: 5,
		path: '/notification'
	},
	{
		label: "cart",
		icon: ShoppingCartOutlinedIcon,
		value: '66+',
		path: '/cart'
	}
];

const buttonStyle = {
	background: 'none',
	boxShadow: 'none',
	marginRight: 1,
};

const ActionMenu = () => {

	const history = useHistory()

	return (
		<>
			<Box display="flex">
				<For each={actionLists}>{({ label, icon: ActionIcon, value, path }, index) =>
					<Fab size="small" sx={buttonStyle} aria-label={label} key={index} onClick={() => {
						history.push(path)
					}}>
						<Badge badgeContent={value} color="primary">
							<ActionIcon />
						</Badge>
					</Fab>
				}</For>
			</Box>
		</>
	);
};

export default ActionMenu;