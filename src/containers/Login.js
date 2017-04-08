import React, { Component, PropTypes } from 'react'
import { Link,browserHistory } from 'react-router'
import configData from '../config.js';
var $ = require ('jquery');


export default class Login extends Component {
 
  constructor (props) {
    super(props);
    this.state = {msg: []};
   
  }

    LoginFunction() {
        var self = this;

        localStorage.setItem('token', "");
        var data = {
            username: $(".username").val(),
            password: $(".password").val()
        };
        $.get(configData.url + "api/login?username=" + data.username + "&password=" + data.password).done((res) => {
            console.log("lead...........");
            console.log(res);
            localStorage.setItem('token', res.token);
            $(".msgShow").toggle(false);
            browserHistory.push('/articleGrid');
            location.reload();

        }).fail((res) => {
            console.log(res);
            console.log(res.responseText);
            $(".msgShow").toggle(true);
        });

        console.log(data);
        //   browserHistory.push('/articleGrid');
    }

    render() {

        return (

            <div style={{"margin-top": "80px"}}>
             <div className="col-md-1">
             </div>
             <div className="col-md-10">
                 <div className="themeA-container">
                    <div className="row">
                        <div className="col-md-3" style={{"margin-top": "5px"}}>
                        </div>
                        <div className="col-md-6" style={{"margin-top": "5px"}}>
                            <div className="general-box" style={{"marginTop": "100px"}}>
                                <div className="col-md-12" style={{"textAlign": "center "}}>
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
                                <div className="form-group col-md-12" style={{"textAlign": "right"}}>
                                    <label className="msgShow" style={{"display": "none", "color": "red"}}>invalid
                                        username and password</label>
                                    <button className="btn btn-primary" onClick={this.LoginFunction}>LogIn</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3" style={{"margin-top": "5px"}}>
                        </div>
                        <div className="col-md-12" style={{"margin-top": "5px"}}>
                        </div>
                    </div>
                </div>
             </div>
             <div className="col-md-1">
             </div>
               
            </div>

        )
    }
}



