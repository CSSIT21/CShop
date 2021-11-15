import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    chatBubble: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        width: '100%'
    },
    left: {
        flexDirection: 'row'
    },
    right: {
        flexDirection: 'row-reverse'
    },
    statusText: {
        display: 'flex',
        flexFlow: 'column wrap',
        color: '#A0A3BD',
        '& span': {
            fontSize: 10
        }
    }
})

export default useStyles
