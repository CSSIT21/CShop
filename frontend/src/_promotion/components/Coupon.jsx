import React from 'react'

function Coupon({namepro,detail,date}) {
    return (
        <div>
                <h2>{namepro}</h2>
                <h1>Detail</h1>
                <p>{detail}</p>
                <h1>Valid</h1>
                <p>{date}</p>
         
        </div>
    )
}

export default Coupon
