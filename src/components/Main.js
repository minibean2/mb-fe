import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
var $ = require('jquery');

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
                <span></span>
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
                }}>
                    <Link onClick={this.logOut.bind()} style={{
                        "float": "right",
                        "color": "white",
                        "font-size": "20px",
                        "margin-top": "17px",
                        "margin-right": "12px"
                    }}>| LogOut </Link>
                    <Link to="/imgUpload" style={{
                        "float": "right",
                        "color": "white",
                        "font-size": "20px",
                        "margin-top": "17px",
                        "margin-right": "12px"
                    }}> Upload Images</Link>
                    <Link>.</Link>
                </div>
            )
        } else {
            userMessage = (
                <div id="header-menu" className="col-md-12 row">
                    <div className="col-md-3 col-sm-3 col-xs-3" id="main-logo"><a href="/">
                        <img src="../lib/images/logo-2.png"/></a></div>
                    <div id="main-menu">
                        <ul>
                            <li className="col-md-1 col-sm-1 col-xs-1">
                                <a href="/"><img src="../lib/images/frontpage/icon_mainMenu_home.png"/></a>
                            </li>
                            <li className="col-md-3 col-sm-3 col-xs-3" style={{"width": "200px"}}>
                                <div className="pull-right">
                                    <div id="fb-btn-set">
                                        <a className="fb-link-btn" href="https://www.facebook.com/minibean.com.hk"
                                           target="_blank"><span>小萌豆 miniBean</span></a>
                                        <iframe className="fb-like-btn" frameborder="0" scrolling="no"
                                                allowtransparency="true"
                                                src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fminibean.com.hk&amp;send=false&amp;layout=button_count&amp;width=305&amp;action=like&amp;colorscheme=light&amp;font&amp;height=30&amp;locale=zh_HK&amp;show_faces=0"></iframe>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            )
        }

        return (
            <div>
                {userMessage}
            </div>
        )
    }
}
