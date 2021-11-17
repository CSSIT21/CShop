import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardLayout } from "./UserCardStyled";
import { Avatar } from "@mui/material";
import { grey, lightBlue, amber } from '@mui/material/colors';
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';

export class SellerCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
        <Card variant="outlined" style={{
            backgroundColor: "#FFEDE7",
            border: 'none',
            marginBottom: '15px'}}>
              <CardContent className={classes.header} sx={{ padding:'28px' }}>
                <Box sx={{ width: '22%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Restriction Type</Typography>
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.type}</Typography>
                </Box>
                <Box sx={{ width: '15%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Assigner</Typography>
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.assigner}</Typography>
                </Box>
                <Box sx={{ width: '12%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Start Time</Typography>
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.startTime}</Typography>
                </Box>
                <Box sx={{ width: '12%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>End Time</Typography>
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.endTime}</Typography>
                </Box>
                <Box sx={{ width: '30%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography style={{ fontSize: '15px', color: '#FD6637'}}>Description</Typography>
                  <Typography style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.desc}</Typography>
                </Box>
                <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <Button variant="contained" sx={{ width: '50%', marginLeft: '35px'}} onClick={() => {this.props.deleteRestriction(this.props.objid, this.props.res.id); this.props.update();}}><DeleteIcon/></Button>
                </Box>
              </CardContent>
            </Card>
    );
  }
}

const styles = theme => ({
  header: {
    display:'flex',
    flexDirection: 'row',
  }
});

export default withStyles(styles, { withTheme: true })(SellerCard);