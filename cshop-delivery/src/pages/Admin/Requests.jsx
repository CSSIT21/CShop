import React, { useEffect, useState } from "react";
import Table from "../../components/Admin/Table";
import Sidebar from "../../components/Layouts/SideBar";
import axios from "axios";

const Requests = () => {
    const [allRequests, setAllRequests] = useState();
    const fetchedRequests = async () => {
        const data = await axios.get(
            "http://localhost:8080/delivery/admin?status=requests"
        );
        setAllRequests(data.data);
    };

    useEffect(() => {
        fetchedRequests();
    }, []);

    return (
        <Sidebar>
            <Table data={allRequests} />
        </Sidebar>
    );
};

export default Requests;
