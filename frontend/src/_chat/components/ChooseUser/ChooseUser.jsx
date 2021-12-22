import React from 'react'
import { Box, Typography } from '@mui/material'
import useStyles from './ChooseUser.styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Avatar } from '@mui/material'

const ChooseUser = (props) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const changeToCustomer = () => {
        handleClose()
        props.setView(true)
    }
    const changeToSeller = () => {
        handleClose()
        props.setView(false)
    }

    return (
        <Box>
            <Button
                endIcon={<KeyboardArrowDownIcon />}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={classes.chooseUserButton}
            >
                <Typography className={classes.displayName}>{props.selected_name}</Typography>
                <Avatar
                    alt="User Pic"
                    src={props.selected_pic}
                    sx={{ width: 30, height: 30, marginLeft: 1 }}
                />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
            >
                <MenuItem onClick={changeToCustomer}>{props.user_name}</MenuItem>
                <MenuItem onClick={changeToSeller}>{props.shop_name}</MenuItem>
            </Menu>
        </Box>
    )
}
export default ChooseUser
