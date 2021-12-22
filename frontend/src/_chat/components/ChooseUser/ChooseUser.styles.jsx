import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    chooseUserButton: {
        display: 'flex !important',
        flexDirection: 'row !important',
        justifyContent: 'space-evenly !important',
        marginRight: '10px !important',
        minWidth: '150px !important',
        maxWidth: '250px !important'
    },
    displayName: {
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: '40px',
        wordBreak: 'break-all',
        whiteSpace: 'nowrap',
        lineHeight: '40px !important'
    }
})

export default useStyles
