import React from 'react'
import { Box, Button, IconButton, Modal, Typography } from '@mui/material'
import useStyles from './ChatPreferenceModal.styles'
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

const ChatPreferenceModal = (props) => {
    const classes = useStyles()
    function labelPrompt() {
        prompt('Add your label')
    }

    return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={classes.modalContainer}
        >
            <Box className={classes.preferenceModalContainer}>
                <Box className={classes.preferenceHeader}>
                    <Box className={classes.preferenceHeaderDetail}>
                        <Typography
                            sx={{ fontWeight: '500', fontSize: '19.57px' }}
                        >
                            Chat preferences - Johny's shop
                        </Typography>
                    </Box>

                    <IconButton>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Box className={classes.preferenceContent}>
                    <Box className={classes.greetingMessage}>
                        <Typography
                            sx={{ fontWeight: '500', fontSize: '22px' }}
                        >
                            Greeting message
                        </Typography>
                        <Typography>
                            When new customers visit your chat page, they will
                            be greeted with
                        </Typography>
                        <TextField
                            id="filled-textarea"
                            fullWidth
                            label="fullWidth"
                            label=""
                            placeholder=""
                            multiline
                            variant="standard"
                            defaultValue="Welcome to our shop chat"
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
                    <Divider variant="middle" sx={{ width: '95%' }} />
                    <Box className={classes.urlSlug}>
                        <Typography
                            sx={{ fontWeight: '500', fontSize: '22px' }}
                        >
                            Url Slug
                        </Typography>
                        <Box className={classes.slugText}>
                            <Typography>
                                Customers can visit www.cshop.com/chat/
                            </Typography>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                size="small"
                                defaultValue="johnyshop"
                                sx={{
                                    width: '150px',
                                    height: '30px',
                                    background: ' rgba(236, 236, 238, 0.7)',
                                    boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '10px',
                                    padding: '0px 10px',
                                    margin: '0px 5px'
                                }}
                            />
                            <Typography> to chat with your shop</Typography>
                        </Box>{' '}
                        <Button className={classes.saveButton}>Save</Button>
                    </Box>
                    <Divider variant="middle" sx={{ width: '95%' }} />
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
                            <ChatLabel
                                color="#BF0039"
                                text="ตอบช้า"
                                removeable={true}
                            />
                            <ChatLabel
                                color="#F1CA3F"
                                text="Woohoo"
                                removeable={true}
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
                    <Divider variant="middle" sx={{ width: '95%' }} />
                    <Box className={classes.automatedResponse}>
                        <Typography
                            sx={{ fontWeight: '500', fontSize: '22px' }}
                        >
                            Automated response
                        </Typography>
                        <Box className={classes.messageTable}>
                            <TableContainer component={Paper}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">
                                                Hello
                                            </TableCell>
                                            <TableCell align="center">
                                                Go away, shop is closed
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                When will item x come in stock
                                                again
                                            </TableCell>
                                            <TableCell align="center">
                                                Probably next year
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    placeholder="Type query here"
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    placeholder="Response"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </Box>
                        <Button className={classes.saveButton}>Save</Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default ChatPreferenceModal
