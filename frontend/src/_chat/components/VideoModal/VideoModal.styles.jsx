import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    videoModalStyle: {
        display: 'flex',
        justifyContent: 'center',
        '& > video': {
            maxWidth: '80vw',
            maxHeight: '90vh'
        }
    },
    closeButton: {
        width: '64px',
        height: '64px',
        position: 'absolute!important',
        top: '0px',
        right: '0px'
    }
})

export default useStyles
