import React from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import config from '../../common/constants';

export class SellerCard extends React.Component {
  constructor(props) {
    super(props);
    this.type = {data:{title: 'PENDING'}};
    this.admin = {firstname: 'Not', lastname: 'Assigned'};
  }

  async componentDidMount(){
    this.type = await axios.get(
        config.SERVER_URL + "/manageaccount/suspension/type?id=" + this.props.res.suspension_type_id
    );
    const fetchedData = await axios.get(
        config.SERVER_URL + "/manageaccount/users/id?id=" + this.props.res.admin_id
    );

    this.admin = fetchedData.data.customer_info;

    this.forceUpdate();
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
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.type.data.title}</Typography>
                </Box>
                <Box sx={{ width: '15%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Assigner</Typography>
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.admin.firstname + " " + this.admin.lastname}</Typography>
                </Box>
                <Box sx={{ width: '12%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>Start Time</Typography>
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.start_date.slice(0, 10)}</Typography>
                </Box>
                <Box sx={{ width: '12%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography noWrap style={{ fontSize: '15px', color: '#FD6637'}}>End Time</Typography>
                  <Typography noWrap style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.end_date.slice(0, 10)}</Typography>
                </Box>
                <Box sx={{ width: '30%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
                  <Typography style={{ fontSize: '15px', color: '#FD6637'}}>Description</Typography>
                  <Typography style={{ fontWeight: 600, fontSize: '15px'}}>{this.props.res.description}</Typography>
                </Box>
                <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <Button variant="contained" sx={{ width: '50%', marginLeft: '35px'}} onClick={() => {this.props.deleteRestriction(this.props.objid); this.props.update();}}><DeleteIcon/></Button>
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