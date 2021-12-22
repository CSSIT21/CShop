import React from "react";
import TableStatus from "../../components/Admin/Table";
import Sidebar from "../../components/Layouts/SideBar";
import { useState, useEffect } from "react";
import axios from "axios";

const Success = () => {
    const [allRequests, setAllRequests] = useState();
    const fetchedRequests = async () => {
        const data = await axios.get(
            "http://localhost:8080/delivery/admin?status=success"
        );
        setAllRequests(data.data);
    };

    useEffect(() => {
        fetchedRequests();
    }, []);

    return (
        <Sidebar>
            <TableStatus data={allRequests} />
        </Sidebar>
    );
};

export default Success;
