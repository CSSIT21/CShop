import styled from 'styled-components'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Icons = styled.div`
	display: flex;
`

const Icon = styled.div`
	cursor: pointer;
`

const Menu = () => {
	return (
		<Icons>
			<Icon><ChatOutlinedIcon /></Icon>
			<Icon style={{ margin: "0px 10px" }}><NotificationsNoneIcon /></Icon>
			<Icon><ShoppingCartOutlinedIcon /></Icon>
		</Icons>
	)
}

export default Menu;