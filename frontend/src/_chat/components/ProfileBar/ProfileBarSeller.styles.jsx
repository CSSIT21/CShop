import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    profileBarContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white'
    },
    avatar: {
        width: '48px',
        height: '48px'
    },
    buttonZone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    textZone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '20px',
        overflow:'hidden',
        width: '600px'
    },
    profileBarDisplayName: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '15px',
        '& > h6': {
            height: '24px',
            lineHeight: '24px',
            fontSize: '22px !important',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: 'calc(50vw - 100px)'
        },
        '& > p': {
            fontSize: '16px !important',
            color: '#A0A3BD !important',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: 'calc(30vw - 100px)'
        }
    },

    userStatus: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },

    grayButton: {
        backgroundColor: '#ECECEEB2',
        color:'#323232 ',
        width:'48.57px !important',
        height:'34.29px !important',
        borderRadius:'7.14286px',
        padding:'7.14286px 14.2857px'
    },
    orangeButton: {
        backgroundColor: '#FD6637',
        color: '#FFFFFF',
        width:'48.57px !important',
        height:'34.29px !important',
        borderRadius:'7.14286px',
        padding:'7.14286px 14.2857px'
    },
    blackButton:{
        backgroundColor: '#FFFFFF',
        color: '#323232 ',
        width:'48.57px !important',
        height:'34.29px !important',
        borderRadius:'7.14286px',
        padding:'7.14286px 14.2857px'
    }
    ,
    userStatus:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    activeButton:{
        color: '#00BF9D',
        width: '12px !important',
        height:'12px !important',
        marginRight:'7px !important'
    },
    offlineButton:{
        color: '#C0C0C0	',
        width: '12px !important',
        height:'12px !important',
        marginRight:'7px !important'
    }
})

export default useStyles
