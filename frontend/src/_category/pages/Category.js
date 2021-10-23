import React, { Component } from 'react';
import Avaicheck from './availability/AvaiCheck';
import './Category.css'
import PriceRange from './price-filter/PriceRange';
import RateStar from './rate-filter/RateStar';
import ServiceCheck from './Service/serviceCheck';


export default class CategoryPage extends Component {
  render() {
    return (
      <div className='filter'>
        <img src='https://static.thenounproject.com/png/40256-200.png' />
        <h5>Filter</h5>
        <PriceRange />
        <RateStar/>
        <ServiceCheck/>
        <Avaicheck/>
      </div>
    );
  }
}
