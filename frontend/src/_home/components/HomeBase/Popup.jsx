import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { makeStyles } from '@mui/styles';
import { useRecoilValue } from 'recoil';
import authState from '~/common/store/authState';
import axios from 'axios';
import config from '~/common/constants';
import dayjs from 'dayjs';

const Popup = () => {
  const classes = useStyles();
  const [popup, setPopup] = useState([]);
  const [open, setOpen] = useState(true);
  const { isLoggedIn, user } = useRecoilValue(authState);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios
      .get(`${config.SERVER_URL}/home/popup`)
      .then(({ data }) => {
        if (data.success) {
          const { description, start_date, end_date, path, thumbnail } =
            data.popup;
          return setPopup({
            description,
            start_date: dayjs(start_date).format('YYYY/MM/DD'),
            end_date: dayjs(end_date).format('YYYY/MM/DD'),
            path,
            thumbnail,
          });
        } else {
          return console.log(data);
        }
      })
      .catch((err) => {
        return console.log(err.message);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      PaperComponent={Box}
    >
      <CancelRoundedIcon
        className={classes.closeStyle}
        sx={{ fontSize: '1.5rem' }}
        onClick={handleClose}
      />

      <Paper className={classes.paperStyle}>
        <DialogTitle id='alert-dialog-title' sx={{ fontSize: '22px' }}>
          {isLoggedIn ? `Hi ${user.customer_info.firstname}!` : `Hi User!`}
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            sx={{ width: '100%', textAlign: 'center', wordBreak: 'break-word' }}
            id='alert-dialog-description'
          >
            {popup.description}
          </DialogContentText>

          <img className={classes.imgStyle} width={75} src={popup.path} />
          <Typography
            fontSize='12px'
            fontWeight={400}
            color='#A0A3BD'
            sx={{ textAlign: 'center', marginTop: '20px' }}
          >
            During {popup.start_date} - {popup.end_date}
          </Typography>
        </DialogContent>
      </Paper>
    </Dialog>
  );
};

const useStyles = makeStyles({
  paperStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '300px',
    maxWidth: '360px',
  },

  imgStyle: {
    display: 'block',
    top: '0%',
    right: '0%',
    margin: '20px auto 0 auto',
    width: '40%',
  },

  closeStyle: {
    color: '#ffffff7d',
    position: 'absolute',
    top: '-14%',
    right: '-6%',
    cursor: 'pointer',

    '&:hover': {
      color: '#FD6637',
    },
  },
});

export default Popup;
