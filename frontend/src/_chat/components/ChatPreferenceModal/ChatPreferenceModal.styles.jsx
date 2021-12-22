import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
    modalContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height:'100%',
    }
    ,
    preferenceModalContainer: {
        display: 'flex',
        flexDirection:'column',
        width: '60%',
        height:'80%',
        backgroundColor:'#FFFFFF',
       borderRadius:'16.31px',
       
    },
    preferenceHeader:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'20px'
    },
    preferenceHeaderDetail:{
        display:'flex',
        justifyContent: 'center',
        width:'100%'
    },
    preferenceContent:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        padding:'0px',
        marginRight:'5px !important',
        marginBottom:'10px !important',
        marginLeft:'12px !important',
        overflowY:'auto',
        rowGap:'22px'
    },
    greetingMessage:{
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
    urlSlug:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        padding:'0px',
        rowGap:'15px'
        
    },
    slugText:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
    },
    labels:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        padding:'0px',
        rowGap:'15px'
        
    },
    automatedResponse:{
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start',
        padding:'0px',
        rowGap:'15px',
        width:'100%'
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
    messageTable:{
        display:'flex !important',
        alignItems:'center !important',
        width:'95%',
        margin:'0px 15px'
    }
})

export default useStyles