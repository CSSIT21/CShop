import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    label: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '5px 2px',
        minWidth: '144px',
        maxWidth: '210px',
        height: '34px',
        background: 'rgba(236, 236, 238, 0.7)',
        boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px'
    },
    cancelButton: {
        color: '#D9DBE9',
        background: '#A0A3BD',
        backgroundImage:
            'radial-gradient(circle, rgba(160,163,189,1) 0%, transparent 100%)',
        width: '18px !important',
        height: '18px !important',
        border: 'none',
        borderRadius: '18px'
    },
    colorLabel: {
        width: '18px !important',
        height: '18px !important'
    }
})

export default useStyles
