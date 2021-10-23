import React from 'react';
import './AvaiCheck.css';

const Avaicheck = () => {
  return (
    <div className='available'>
      <hr />
      <h3>Availability</h3>
      <input type='checkbox' id='readyship-check' />
      <label for='readyship-check'>Ready to Ship</label>
      <br />
      <br />
      <input type='checkbox' id='stock-check' />
      <label for='stock-check'>Include Out Of Stock</label>
    </div>
  );
};

export default Avaicheck;
