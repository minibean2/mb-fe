import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component';
var Slider = require('react-slick');
var $ = require('jquery');
//var InfiniteScroll = require('react-infinite-scroll-component');


export default class Main extends Component {

    constructor(props) {
        super(props);

        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("/");
        this.page = urlArr[urlArr.length - 1];
        console.log(this.page);

        console.log(localStorage.getItem('token'));
        if (this.page == "articleGrid" || this.page == "createArticle") {
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

    logOut() {
        console.log("logOut");
        localStorage.setItem('token', "");
        browserHistory.push('/login');
        location.reload();
    }

    render() {

        let userMessage;
        if (this.page == "login") {
            userMessage = (
                <span>
         
        </span>
            )
        } else if (this.page == "articleGrid" || this.page == "createArticle") {
            userMessage = (
                <div className="col-md-12" style={{
                    "overflow": "hidden",
                    "position": "fixed",
                    "top": "0px",
                    "background-color": "#36648B",
                    "height": "75px",
                    "width": "100%",
                    "zIndex": "1"
                }}><Link onClick={this.logOut.bind()} style={{
                    "float": "right",
                    "color": "white",
                    "font-size": "20px",
                    "margin-top": "17px",
                    "margin-right": "12px"
                }}>| LogOut </Link><Link to="/upload" style={{
                    "float": "right",
                    "color": "white",
                    "font-size": "20px",
                    "margin-top": "17px",
                    "margin-right": "12px"
                }}> Upload Images</Link><Link>.</Link></div>
            )
        } else {
            userMessage = (
                <div className="col-md-12" style={{
                    "overflow": "hidden",
                    "position": "fixed",
                    "top": "0px",
                    "background-color": "#36648B",
                    "height": "75px",
                    "width": "100%",
                    "zIndex": "1"
                }}><Link to="/dashboard" style={{
                    "float": "right",
                    "color": "white",
                    "font-size": "20px",
                    "margin-top": "17px",
                    "margin-right": "12px"
                }}>Home</Link><Link>.</Link></div>
            )
        }


        return (
            <div>
                {userMessage}
            </div>

        )
    }
}
