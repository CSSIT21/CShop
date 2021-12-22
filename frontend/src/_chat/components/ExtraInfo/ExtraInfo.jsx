import React from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import useStyles from './ExtraInfo.styles'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import AddIcon from '@mui/icons-material/Add'
import { ChatLabel } from '..'
import CloseIcon from '@mui/icons-material/Close'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const ExtraInfo = (props) => {
    const classes = useStyles(props.color)
    function labelPrompt() {
        prompt('Add your label')
    }

    return (
        <Box >
            <Drawer open={props.open} anchor="right">
                <Box className={classes.drawerContainer}>
                <Box className={classes.drawerContent}>
                    <Box className={classes.labels}>
                        <Typography
                            sx={{ fontWeight: '500', fontSize: '22px' }}
                        >
                            Labels
                        </Typography>
                        <Box className={classes.chatLabelList}>
                            <ChatLabel
                                color="#00BF9D"
                                text="New customer"
                                removeable={true}
                            />
                            <ChatLabel
                                color="#7600BF"
                                text="คนนี้เรื่องเยอะ"
                                removeable={true}
                            />
                        </Box>
                        <Typography
                            sx={{ fontWeight: '400', fontSize: '18px' }}
                        >
                            All labels
                        </Typography>
                        <Box className={classes.chatLabelList}>
                            <ChatLabel
                                color="#00BF9D"
                                text="New customer"
                                removeable={false}
                            />
                            <ChatLabel
                                color="#7600BF"
                                text="คนนี้เรื่องเยอะ"
                                removeable={false}
                            />
                            <ChatLabel
                                color="#BF0039"
                                text="ตอบช้า"
                                removeable={false}
                            />
                            <ChatLabel
                                color="#F1CA3F"
                                text="Woohoo"
                                removeable={false}
                            />
                        </Box>
                        <Button
                            className={classes.addLabelButton}
                            onClick={() => labelPrompt()}
                        >
                            <AddIcon />
                            <Typography sx={{ marginLeft: '14px' }}>
                                Add label
                            </Typography>
                        </Button>
                    </Box>
                    <Divider variant="middle" sx={{ width: '90%' }} />
                    <Box className={classes.noteMessage}>
                        <Typography
                            sx={{ fontWeight: '500', fontSize: '22px' }}
                        >
                            Note
                        </Typography>
                        <TextField
                            id="standard-multiline-static"
                            label=""
                            multiline
                            rows={4}
                            placeholder="Note here"
                            variant="standard"
                            fullWidth
                            sx={{
                                background: ' rgba(236, 236, 238, 0.7)',
                                boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                padding: '0px 10px',
                                margin: '10px 0px'
                            }}
                        />
                        <Button className={classes.saveButton}>Save</Button>
                    </Box>
                </Box>
                </Box>
            </Drawer>
        </Box>
    )
}
export default ExtraInfo
