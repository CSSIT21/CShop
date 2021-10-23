import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';


const SearchBox = styled.div`
	width: 100%;
	height: 46px;
	position: relative;
	padding: 0px 6px 0px 20px;

	display: flex;
	align-items: center; 
	box-sizing:  border-box;

	border-radius: 10px;
	background-color: #ECECEE; 
`;

const SearchInput = styled.input`
	width: 100%;
	padding: 5px;

	color: #A0A3BD;
	border: none;
	background-color: transparent;

	&:focus {
		outline: none;
		color: black;
	}
`;

const SearchButton = styled.button`
	width: 12% ; 
	height: 38px;

	display: flex;
	align-items: center;
    justify-content: center;

	border-radius: 10px;
	border: none;
	background-color: #FD6637;
	color: white;
	
	cursor: pointer;
`;

const Search = () => {
	return (
		<>
			<SearchBox>
				<SearchIcon sx={{ color: '#A0A3BD' }} />
				<SearchInput placeholder="What are you looking for?" />
				<SearchButton type="button" >Search</SearchButton>
			</SearchBox>
		</>
	)
}

export default Search;