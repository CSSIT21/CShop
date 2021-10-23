import styled from 'styled-components';
import CShopLogo from '../../assets/images/Logo.svg';
import Search from './Search';
import Menu from './Menu';
import AccountDropdown from './AccountDropdown';

const NavbarWrapper = styled.div`
	padding: 0px 50px;
	display: flex;
	align-items: center;
`;

const NavbarLeft = styled.div`
	width: 10%;
	margin-right: 10px;
`;

const NavbarMiddle = styled.div`
	width: 70%;
	padding: 0 20px;
	margin-right: 10px;
`;

const NavbarRight = styled.div`
	width: 20%;
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const Logo = styled.img`
	width: 100%;
`;


const NavBarContent = () => {
	return (
		<NavbarWrapper>
			<NavbarLeft>
				<Logo src={CShopLogo} />
			</NavbarLeft>

			<NavbarMiddle>
				<Search />
			</NavbarMiddle>

			<NavbarRight>
				<Menu />
				<AccountDropdown />
			</NavbarRight>
		</NavbarWrapper>
	);
};

export default NavBarContent;
