import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    videoBubble: {
        maxWidth: '28vw',
        maxHeight: 'calc(75vh - 191.25px)',
        borderRadius: '27.2347px',
        margin: '0px 10px',
        marginTop: '20px',
        backgroundColor: '#FD6637 !important',
        '& img': {
            width: '28vw',
            height: '200px',
            opacity: 0,
            transition: 'all 500ms ease',
            filter: 'brightness(0.8)'
        }
    },
    videoThumbnailPlay: {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoThumbnailPlayIcon: {
        width: '5rem !important',
        height: '5rem !important',
        color: 'white !important',
        zIndex: 999
    }
})

export default useStyles
