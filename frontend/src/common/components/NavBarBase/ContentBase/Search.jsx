import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CButton from '../../CButton';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { nanoid } from 'nanoid';
const Search = ({
  showButton = true,
  placeholder = 'What are you looking for?',
}) => {
  const q =
    qs.parse(window.location.search, { ignoreQueryPrefix: true }).q || '';
  const router = useHistory();
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [keyWord, setKeyWord] = useState(q);
  const { id } = useParams();
  const searching = () => {
    if (id && id > 0)
      router.push(`/search/category/${id}?q=${keyWord.trim()}&id=${nanoid()}`);
    else router.push(`/search?q=${keyWord.trim()}&id=${nanoid()}`);
  };

  return (
    <>
      <Box className={classes.searchBox}>
        <SearchIcon className={classes.searchIcon} />
        <input
          value={keyWord}
          className={classes.searchInput}
          placeholder={placeholder}
          onChange={(e) => setKeyWord(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              searching();
            }
          }}
        />
        {showButton && (
          <CButton
            onClick={searching}
            title='Search'
            width='90px'
            height='38px'
          />
        )}
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  searchBox: {
    width: '100%',
    height: 46,
    position: 'relative',
    padding: '0px 6px 0px 24px',

    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',

    borderRadius: 10,
    backgroundColor: '#ECECEE',
    transition: 'all ease 0.125s',

    '&:focus-within': {
      boxShadow: '1px 2px 4px rgb(0,0,0,0.2)',
    },
  },
  searchInput: {
    width: '100%',
    padding: 5,

    color: '#A0A3BD',
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '15px',

    '&:focus': {
      outline: 'none',
      color: 'black',
    },
  },

  searchIcon: {
    color: '#A0A3BD',
    cursor: 'pointer',

    '&:hover': {
      color: '#6e6e6e',
    },
  },
});

export default Search;
