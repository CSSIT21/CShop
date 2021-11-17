import { makeStyles, Box, TextField } from '@mui/material'
import { useState } from 'react'

function YoutubeSection({id:ID, ...rest}) {
    const [id, setId] = useState(ID);
    return (<>
        <Box sx={{backgroundColor: '#EFEFF1', width: '100%', padding: '2.5rem', display: 'flex', justifyContent: 'center', position: 'relative'}} {...rest}>
            <img src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`} alt="thumnail"></img>
            <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/youtube_logo_icon_168737.png" style={{position: 'absolute', width: '52px', height: '52px', top:'50%', left: '50%', transform: 'translate(-50%,-50%)'}}/>
        </Box>
        <TextField value={id} onChange={e => setId(e.target.value)}/>
    </>)
}

export default YoutubeSection
