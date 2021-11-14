import React from "react";
import { CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import { Collapse } from "@mui/material";
import { IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardLayout } from "./UserCardStyled";

export class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  handleExpandClick = () => {
    this.setState({ expand: !this.state.expand });
  };

  render() {
    return (
      <CardLayout onClick={this.handleExpandClick} elevation={0}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            TEST
          </Typography>
        </CardContent>
        <Collapse in={this.state.expand} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Title</Typography>
            <Typography>desc</Typography>
          </CardContent>
        </Collapse>
      </CardLayout>
    );
  }
}

export default UserCard;