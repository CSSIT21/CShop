import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    textBubbleRight: {
        maxWidth: '40%',
        backgroundColor: '#FD6637',
        color: '#FFFFFF',
        margin: '0px 8px',
        marginTop: '20px',
        padding: '8px 15px',
        borderRadius: '29px 0px 29px 29px',
        boxShadow:
            '0px 0px 1.19849px rgba(0, 0, 0, 0.24), 0px 2.39699px 4.79398px rgba(0, 0, 0, 0.16), 0px -1.19849px 1.19849px rgba(0, 0, 0, 0.08)'
    },
    textBubbleLeft: {
        maxWidth: '40%',
        backgroundColor: '#FFFFFF',
        color: '#323232',
        margin: '0px 8px',
        marginTop: '20px',
        padding: '8px 15px',
        borderRadius: '0px 29px 29px 29px',
        boxShadow:
            '0px 0px 1.19849px rgba(0, 0, 0, 0.24), 0px 2.39699px 4.79398px rgba(0, 0, 0, 0.16), 0px -1.19849px 1.19849px rgba(0, 0, 0, 0.08)'
    }
})

export default useStyles
