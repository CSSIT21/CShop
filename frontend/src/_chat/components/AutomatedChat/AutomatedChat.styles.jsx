import { makeStyles } from '@mui/styles'


const useStyles = makeStyles({
    automatedContainer: {
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        padding:'2px 18px',
        width:'100%',
        height:'60px',
        marginTop:'20px'
    },
    automatedButton:{
        backgroundColor:'#FFFFFF !important',
        color:'#000000 !important',
        margin:'0px 10px !important',
        padding:'5px 10px !important',
        textTransform:'none !important',
        boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)'
    }
})

export default useStyles