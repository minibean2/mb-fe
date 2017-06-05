import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import config from '../RootConfig';

var $ = require('jquery');

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { msg: [] };
    }

    login() {
        var self = this;

        localStorage.setItem('token', "");
        var data = {
            username: $(".username").val(),
            password: $(".password").val()
        };

        $.get(config.API_URL + "api/login?username=" + data.username + "&password=" + data.password).done((res) => {
            //console.log(res);
            localStorage.setItem('token', res.token);
            $(".msgShow").toggle(false);
            browserHistory.push('/articleGrid');
            location.reload();

        }).fail((res) => {
            console.log(res);
            console.log(res.responseText);
            $(".msgShow").toggle(true);
        });

        //console.log(data);
        //browserHistory.push('/articleGrid');
    }

    render() {

        return (
            <div style={{ "marginTop": "72px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-md-3" style={{ "marginTop": "5px" }}>
                            </div>
                            <div className="col-md-6" style={{ "marginTop": "5px" }}>
                                <div className="general-box" style={{ "marginTop": "100px" }}>
                                    <div className="col-md-12" style={{ "textAlign": "center " }}>
                                        <h1>LOGIN</h1>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group col-md-12">
                                        <div className="col-md-4">
                                            <label>UserName :</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control username col-md-8"
                                                name="username" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <div className="col-md-4">
                                            <label>Password :</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="password" className="form-control password col-md-8"
                                                name="password" />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12" style={{ "textAlign": "right" }}>
                                        <label className="msgShow" style={{ "display": "none", "color": "red" }}>invalid
                                            username and password</label>
                                        <button className="btn btn-primary" onClick={this.login}>Log In</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3" style={{ "marginTop": "5px" }}>
                            </div>
                            <div className="col-md-12" style={{ "marginTop": "5px" }}>
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



