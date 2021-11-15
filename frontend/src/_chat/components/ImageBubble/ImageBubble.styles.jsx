import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    imageBubble: {
        maxWidth: '28vw',
        maxHeight: 'calc(75vh - 191.25px)',
        borderRadius: '27.2347px',
        margin: '8px',
        backgroundColor: '#FD6637 !important',
        '& img': {
            width: '200px',
            height: '200px',
            opacity: 0,
            transition: 'all 500ms ease'
        }
    },
    imageSpinner: {
        color: 'white',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default useStyles
