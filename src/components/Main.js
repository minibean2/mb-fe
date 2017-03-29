import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component';
var Slider = require('react-slick');
var $ = require ('jquery');
//var InfiniteScroll = require('react-infinite-scroll-component');



export default class Main extends Component {
 

  getDivs = () => {
    return this.divs;
  }

  getInputValue = () => {
    return this.refs.input.value
  }

  setInputValue = (val) => {
   
    this.refs.input.value = val
  }
  
 


  

  render() {




   
   
    return (
   
    <div className="col-md-12" style={{"overflow":"hidden","position":"fixed","top":"0px","background-color" : "#36648B","height":"75px","width":"100%","zIndex":"1"}}><Link to="/dashboard" style={{"float" : "right","color":"white","font-size":"20px","margin-top":"17px","margin-right":"12px"}}>Home</Link><Link>.</Link></div>
    )
  }
}
