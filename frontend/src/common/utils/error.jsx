import { WarningRounded } from '@mui/icons-material';
import React, { useEffect } from 'react';
import './error.css';

const ErrorPage = ({error, errorInfo}) => {
    var urlRegex = /(https?:\/\/[^ ]*)/;
    var getLocation = function(href) {
        var l = document.createElement("a");
        l.href = href;
        return l;
    };
    function getUrl(errorMessage){
        var url = errorMessage.match(urlRegex)[1];
        return '~'+ getLocation(url.split('?')[0]).pathname;
    }

    const componentStack = errorInfo?.componentStack;
    const errorMessage = error.toString();
    useEffect(() => {
        document.body.classList.add('error');
        return () => document.body.classList.remove('error');
    },[]);
    return (
        <div className="error" style={{padding: "20px", color: 'white'}}>
            <h1><WarningRounded/> โอ้วไม่นะ เพื่อน!, มี Error หว่ะ</h1>
            <h4>ชิบหายละ ฝากเช็คไฟล์ตามนี้ที</h4>
            <div><b>คือ... Error มันบอกว่า</b> <span>{errorMessage}</span></div>
            <div class="naenam"><WarningRounded/> <b> คำแนะนำ</b>&nbsp;ลอง&nbsp;<b>เปิดดู&nbsp;หรือ&nbsp;แก้ไข</b>&nbsp;
            {componentStack && <b>{getUrl(componentStack.toString().split("\n").filter(e => e.trim() !== "")[0])}</b>}
            </div>
            <h4><b>เช็คทีดิ&nbsp; (ถ้าข้างบนยังแก้ไม่ได้อ่ะนะ):</b></h4>
            <ul>
            {componentStack && <b>{componentStack.toString().split("\n").filter(e => e.trim() !== "").map(e => <li>{e}</li>)}</b> }
    
           </ul>
            <a href="/">Go home now!</a>
        </div>
    )
}

export default ErrorPage
