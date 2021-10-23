import React from 'react';
import './ServiceCheck.css';

const ServiceCheck = () => {
  return (
    <div className='service'>
      <hr />
      <h3>Service</h3>
      <input type='checkbox' id='ship-check' />
      <label for='ship-check'>Free Shipping</label>
      <br />
      <br />
      <input type='checkbox' id='discount-check' />
      <label for='discount-check'>With Discount</label>
    </div>
  );
};

export default ServiceCheck;
