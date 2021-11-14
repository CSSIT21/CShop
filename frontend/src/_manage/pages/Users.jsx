import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Paper from '@mui/material/Paper';
import { List } from "@mui/material";
import { For } from "~/common/utils/index";
import { styled } from '@mui/material/styles';
import { Pagination } from '@mui/material';
import React, { Fragment, useEffect, useLayoutEffect } from "react";
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import CButton from "../../common/components/CButton";
import UserCard from "../components/UserCard";

const cardStyle = {
    width: '100%',
    padding: '8px',
    margin: '0 auto',
  
    borderRadius: "15px",
    border: 'none',
    transition: "all ease 0.125s",
  };

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

let users = [1, 2, 3];

const ManageAccountPage = () => {

    useLayoutEffect(() => {
        document.body.classList.add("gray");
        return () => document.body.classList.remove("gray");
      }, []);

    return (
        <List>
            <Card variant="outlined" sx={cardStyle}>
                <CardContent>
                    {users.map(() => (
                        <div style={{ display:'flex', justifyContent:'center' }}>
                            <UserCard/>
                        </div>
                    ))}
                </CardContent>
                <CardContent>      
                    <div style={{ display:'flex', justifyContent:'center' }}>
                    <Pagination count={10} showFirstButton showLastButton color="primary" shape="rounded"/>
                    </div>
                </CardContent>
            </Card>
        </List>
    );
};

export default ManageAccountPage;
