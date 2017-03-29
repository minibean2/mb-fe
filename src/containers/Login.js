import React, { Component, PropTypes } from 'react'
import { Link,browserHistory } from 'react-router'

var $ = require ('jquery');


var urlPath = "http://localhost:9000/";
 
//const rowGetter = rowNumber => rows[rowNumber];

export default class RepoPage extends Component {
 
  constructor (props) {
    super(props);
   console.log(this.urlPath);
   
  }



LoginFunction(){
   var data = {
               username  : $(".username").val(),
               password  : $(".password").val()
           };
       $.get(urlPath+"api/login?username="+data.username+"&password="+data.password).done((res) => {
           console.log("lead...........");
           console.log(res);
             browserHistory.push('/articleGrid');
              location.reload();
          
        }); 
      
  console.log(data);
}



  render() {


    return (
      
      <div style={{"margin-top":"80px"}}>
        <div className="themeA-container">
            <div className="row">
            <div className="col-md-3" style={{"margin-top" : "5px"}}>
                 
               
            </div>
             <div className="col-md-6" style={{"margin-top" : "5px"}}>
              <div className="general-box" style={{"marginTop" : "100px"}}>
                     <div className="col-md-12" style={{"textAlign" : "center "}}>
               <h1>LOGIN</h1>

            </div>
            <hr></hr>
            <div className="form-group col-md-12">
               <div className="col-md-4">
                    <label>UserName :</label>
               </div>
               <div className="col-md-8">
                    <input type="text" className="form-control username col-md-8" name="username"/>
               </div>
            </div>
             <div className="form-group col-md-12">
               <div className="col-md-4">
                    <label>Password :</label>
               </div>
               <div className="col-md-8">
                    <input type="text" className="form-control password col-md-8" name="password"/>
               </div>
            </div>
             <div className="form-group col-md-12" style={{"textAlign" : "right"}}>
                <button className="btn btn-primary" onClick={this.LoginFunction}>LogIn</button>
           </div>
              </div>
             </div> 
            <div className="col-md-3" style={{"margin-top" : "5px"}}>
                 
               
            </div>
              
            <div className="col-md-12" style={{"margin-top" : "5px"}}>
                
            </div>
           

           
           </div>
         </div>
      </div>
       
    )
  }
}



