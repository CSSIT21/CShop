import React, { Component } from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import './RateStar.css';
export default class RateStar extends Component {
  render() {
    return (
      <div className='star'>
        <hr />
        <h3>Rate</h3>
        <div className='fivestars'>
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaStar />
        </div>
        <div className='fourstars'>
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp; Up
        </div>
        <div className='threestars'>
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp; Up
        </div>
        <div className='twostars'>
          <FaStar /> &nbsp;
          <FaStar /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp; Up
        </div>
        <div className='onestar'>
          <FaStar /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp;
          <FaRegStar className='nonestar' /> &nbsp; Up
        </div>
      </div>
    );
  }
}
