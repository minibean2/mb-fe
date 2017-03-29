import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component';
var Slider = require('react-slick');
var $ = require ('jquery');
//var InfiniteScroll = require('react-infinite-scroll-component');



export default class Main extends Component {
 
 constructor (props) {
    super(props);
    
   var url = window.location.href;
     var urlArr = [];
      urlArr = url.split("/");
      this.page = urlArr[urlArr.length-1];
      console.log(this.page);
   
  }
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



let userMessage;
    if (this.page == "login") {
      userMessage = (
        <span>
         
        </span>
      )
    } else if(this.page == "articleGrid"){
         userMessage = (
              <div className="col-md-12" style={{"overflow":"hidden","position":"fixed","top":"0px","background-color" : "#36648B","height":"75px","width":"100%","zIndex":"1"}}><Link to="/articleGrid" style={{"float" : "right","color":"white","font-size":"20px","margin-top":"17px","margin-right":"12px"}}>Home</Link><Link>.</Link></div>
         )
    } else {
      userMessage = (
       <div className="col-md-12" style={{"overflow":"hidden","position":"fixed","top":"0px","background-color" : "#36648B","height":"75px","width":"100%","zIndex":"1"}}><Link to="/dashboard" style={{"float" : "right","color":"white","font-size":"20px","margin-top":"17px","margin-right":"12px"}}>Home</Link><Link>.</Link></div>
      )
    }
   
   
    return (
          <div>
                 {userMessage}
          </div>
     
    )
  }
}
