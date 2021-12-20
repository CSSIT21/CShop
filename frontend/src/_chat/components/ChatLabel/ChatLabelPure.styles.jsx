import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    label: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '5px 5px',
        width: '160px',
        height: '34px',
        background: 'rgba(236, 236, 238, 0.7)',
        boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px'
    },
    colorLabel: {
        color: '#00BF9D',
        width: '18px !important',
        height: '18px !important'
    }
})

export default useStyles