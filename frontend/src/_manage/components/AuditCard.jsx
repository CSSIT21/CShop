import { Component } from "react";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import config from '../../common/constants';
import { CardLayout } from "./UserCardStyled";
import { Avatar } from "@mui/material";
import { withStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";

export class AuditCard extends Component {
  constructor(props) {
    super(props);
    this.name = {firstname: 'PENDING', lastname: ''};
  }

  async componentDidMount(){
    const fetchedData = await axios.get(
      config.SERVER_URL + "/manageaccount/users/id?id=" + this.props.audit.admin_id
    );

    this.name = fetchedData.data.customer_info;

    this.forceUpdate();
  }

  render() {
    const { classes } = this.props;

    return (
      <CardLayout elevation={0}>
        <CardContent>
          <Box className={classes.header}>
            <Box sx={{ width: '12%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px'}}>#{this.props.audit.admin_id}</Typography>
            </Box>
            <Box sx={{ width: '20%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontWeight: 600, fontSize: '15px'}}>{this.name.firstname + " " + this.name.lastname}</Typography>
            </Box>
            <Box sx={{ width: '10%', display:'flex', flexDirection: 'column', justifyContent: 'center' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.audit.login_date}</Typography>
            </Box>
            <Box sx={{ width: '50%', display:'flex', flexDirection: 'column', justifyContent: 'center', margin: '0px 0px 0px 60px' }}>  
              <Typography style={{ fontSize: '15px', textAlign: 'center'}}>{this.props.audit.action}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardLayout>
    );
  }
}

const styles = theme => ({
  header: {
    display:'flex',
    flexDirection: 'row',
  }
});

const textField = {
  borderRadius: "10px",
  width: "90%",
};
const dateTextField = {
  width: "90%",
};



export default withStyles(styles, { withTheme: true })(AuditCard);