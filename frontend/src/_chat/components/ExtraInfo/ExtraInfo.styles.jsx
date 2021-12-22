import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    drawerContainer:{
        display: 'flex',
        flexDirection:'column',
        width: '100%',
        height:'100%',
        backgroundColor:'#FFFFFF',
        overflow:'hidden'
    },
    drawerContent:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        padding:'10px',
        marginRight:'5px !important',
        marginBottom:'10px !important',
        marginLeft:'12px !important',
        overflowY:'auto',
        rowGap:'22px',
        width: '100%'
    },
    noteMessage:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        padding:'0px',
        width:'90%',
        rowGap:'15px'
    },
    saveButton:{
        backgroundColor:'#FD6637 !important',
        color:'#FFFFFF !important',
        borderRadius:'7.14286px !important',
        padding:'7.14286px 14.2857px !important',
        width: '57.57px !important',
        height: '31.29px !important',
        textTransform:'none !important'
    },
    labels:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        padding:'0px',
        rowGap:'15px',
        width:'420px'
    },
    addLabelButton:{
        textTransform:'none !important',
        display:'flex !important',
        flexDirection:'row !important',
        justifyContent:'space-between !important'
    },
    chatLabelList:{
        display:'flex ',
        flexDirection:'row ',
        flexWrap:'wrap',
        columnGap:'15px',
        rowGap:'10px'
    },
})

export default useStyles