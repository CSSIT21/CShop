import { Avatar } from '@mui/material';
import React from 'react'
import styled from 'styled-components'
import DropdownDetail from './DropdownDetail';

const Account = styled.div`
	display: flex;
	align-items: center;
`;

const AccountName = styled.div`
	width: 100%;
	padding-right: 10px;
	color: black;
`;

const AccountDropdown = () => {
	const username = 'Firstname';
	const url = "https://cdn.discordapp.com/attachments/681542997946794044/888113518182805614/unknown.png";

	return (
		<Account>
			<AccountName>{username}</AccountName>
			<Avatar src={url} sx={{ width: 30, height: 30 }} />
			<DropdownDetail />
		</Account>
	)
}

export default AccountDropdown;