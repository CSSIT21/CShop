import TopBar from './NavBarBase/TopBar'
import NavbarContent from './NavBarBase/NavBarContent'

const NavBar = ({ isLogin = true }) => {
	return (
		<>
			<TopBar />
			<NavbarContent isLogin={isLogin} />
		</>
	)
}

export default NavBar;