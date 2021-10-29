import { CircularProgress } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

const LoaderWrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: ${({show}) => show ? '0' : '1'};
    transition: all .25s ease-in-out;
`;

const SkeletonLoading = () => {
    const [show, setShow] = useState(false);

    // useEffect(() => {
    //     setShow(true);
    // },[]);

    return <></>;
}

export default SkeletonLoading;