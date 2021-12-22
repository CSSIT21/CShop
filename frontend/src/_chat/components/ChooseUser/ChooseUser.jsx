import React from 'react'
import { Box } from '@mui/material'
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

    return (
        <Box>
            <Button
                endIcon={<KeyboardArrowDownIcon />}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className={classes.chooseUserButton}
            >
                johny
                <Avatar
                    alt="User Pic"
                    src={props.pic}
                    sx={{ width: 30, height: 30 }}
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
                <MenuItem onClick={handleClose}>Johny's shop</MenuItem>
                <MenuItem onClick={handleClose}>Tanny's shop</MenuItem>
            </Menu>
        </Box>
    )
}
export default ChooseUser
