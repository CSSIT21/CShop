import TopBar from './NavBarBase/TopBar'
import NavbarContent from './NavBarBase/NavBarContent'

const NavBar = ({ isLogin }) => {
	return (
		<>
			<TopBar />
			<NavbarContent isLogin={isLogin} />
		</>
	)
}

export default NavBar;