import styled from 'styled-components'
import { Link } from 'react-router-dom';

const TopBarWrapper = styled.div`
	width: 100%;
	padding: 0px 50px;
	margin: 15px 0px;

	box-sizing: border-box;
	font-size: 12px;
	line-height: 24px;
	display: flex;
	justify-content: space-between;
	& a{
	color: #A0A3BD;
	}
`;

const TopBarLeft = styled.div`
	display: flex;
	width: auto;
`;

const TopBarRight = styled.div`
	display: flex;
	width: auto;
	justify-content: flex-end;
`;

const SellerCenter = styled.div`
	margin-right: 50px;
`;

const SellerRegister = styled.div`
	
`;


const SellerTopBar = () => {
	return (
		<TopBarWrapper>
			<TopBarLeft>
				<SellerCenter><Link to={"/login"}>Seller Center</Link></SellerCenter>
				<SellerRegister><Link to={"/login"}>Seller Register</Link></SellerRegister>
			</TopBarLeft>

			<TopBarRight><Link to={"/support"}>Support</Link></TopBarRight>
		</TopBarWrapper>

	)
}

export default SellerTopBar
