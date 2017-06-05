import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'

var $ = require('jquery');

var adminLoginPage = "login";
var adminPages = [
    "articleGrid",
    "createArticle",
    "imgUpload"
];

export default class Main extends Component {

    constructor(props) {
        super(props);

        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("/");
        this.page = urlArr[urlArr.length - 1];

        //console.log("url=" + url);
        //console.log("this.page=" + this.page);

        //console.log(localStorage.getItem('token'));
        if (adminPages.indexOf(this.page) != -1) {
            if (localStorage.getItem('token') == "") {
                browserHistory.push('/login');
                location.reload();
            }
        }
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

    search() {
        var self = this;

        var searchKey = $("#searchKey").val();
        if (searchKey != null && searchKey.length > 0) {
            //console.log('searchKey=' + searchKey);
            browserHistory.push('/searchResults?key=' + searchKey);
        }
    }

    logOut() {
        //console.log("logOut");
        localStorage.setItem('token', "");
        browserHistory.push('/login');
        location.reload();
    }

    render() {
        let header, footer;

        if (this.page == adminLoginPage) {
            header = (
                <span></span>
            )

            footer = (
                <span></span>
            )
        } else if (adminPages.indexOf(this.page) != -1) {
            header = (
                <div style={{
                    "overflow": "hidden",
                    "position": "fixed",
                    "top": "0px",
                    "backgroundColor": "#36648B",
                    "height": "50px",
                    "width": "100%",
                    "paddingTop": "20px",
                    "fontSize": "16px",
                    "zIndex": "1"
                }}>
                    <Link to="/articleGrid" style={{
                        "float": "left",
                        "color": "white",
                        "marginLeft": "5%",
                        "marginRight": "15px"
                    }}>All Articles</Link>

                    <Link to="/createArticle" style={{
                        "float": "left",
                        "color": "white",
                        "marginLeft": "15px",
                        "marginRight": "15px"
                    }}>Create Article</Link>

                    <Link to="/imgUpload" style={{
                        "float": "left",
                        "color": "white",
                        "marginLeft": "15px",
                        "marginRight": "15px"
                    }}>Upload Image</Link>

                    <a onClick={this.logOut.bind()} style={{
                        "float": "right",
                        "color": "white",
                        "marginLeft": "15px",
                        "marginRight": "5%"
                    }}>Log Out</a>

                </div>
            )

            footer = (
                <span></span>
            )
        } else {
            header = (
                <div id="header-menu" className="col-md-12 row">
                    <div className="col-md-3 col-sm-3 col-xs-3" id="main-logo">
                        <a href="/"><img src="../lib/images/logo-2.png" /></a>
                    </div>
                    <div id="main-menu">
                        <ul>
                            <li className="col-md-1 col-sm-1 col-xs-1">
                                <a href="/"><img src="../lib/images/frontpage/icon_mainMenu_home.png" /></a>
                            </li>

                            <div id="main-search-box" name="main-search-box" className="pull-left">
                                <a id="main-search-wrapper">
                                    <div className="input-group innerB main-search">
                                        <input type="text" name="searchKey" id="searchKey"
                                            className="form-control" placeholder="" />
                                        <div className="input-group-btn">
                                            <button id="submit-search" className="btn btn-default" type="submit" onClick={this.search}>
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                </a>

                                {/*}
                                <div className="row">
                                    <ul style={{
                                        "top": "23px",
                                        "left": "5px",
                                        "overflowY": "scroll",
                                        "maxHeight": "345px",
                                        "width": "260px"
                                    }}
                                        className="dropdown-menu chat media-list hide">
                                    </ul>
                                </div>
                                */}
                            </div>

                        </ul>
                    </div>
                </div>
            )

            footer = (
                <div id="footer-menu" className="footer-menu">
                    <div className="pull-right" style={{
                        "marginTop": "2px"
                    }}>
                        <Link to="/about" style={{
                            "fontSize": "12px",
                            "color": "white"
                        }}>關於 miniBean 小萌豆</Link>
                    </div>
                </div>
            )
        }

        return (
            <div>
                {header}
                {footer}
            </div>
        )
    }
}
