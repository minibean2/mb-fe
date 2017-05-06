import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import config from './RootConfig';
import constants from '../constants';

var $ = require('jquery');

const divs = [];

export default class AboutPage extends Component {

    constructor(props) {
        super(props);

        this.state = { divs: divs };
    }

    componentDidMount() {
        console.log('componentDidMount...');

        window.scrollTo(0, 0);
    }

    render() {
        console.log('render...');

        return (
            <div style={{ "marginTop": "50px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{ "marginTop": "5px" }}>
                                <div className="general-box" style={{ "minHeight": "300px" }}>
                                    <div style={{ "padding": "10px 25px" }}>
                                        <h4 style={{ "color": "rgb(50, 79, 225)", "paddingBottom": "10px", "borderBottom": "#93C0ED solid 2px" }}>關於 miniBean 小萌豆</h4>
                                        <div>
                                            minibean.com.hk - 親子社交平台。每個家長都希望給他們可愛的「小萌豆」最好的照顧，但是每天忙碌的工作令家長沒有時間尋找更好的育兒和親子資訊。「小萌豆」是一個親子社交平台，透過家長互相分享經驗和心得，大家都能夠得到更貼心的資訊，同時也可以分享照顧「小萌豆」當中的甜酸苦辣。
                                        </div>
                                        <div style={{ "paddingTop": "25px" }}>
                                            聯絡我們: <a href="mailto:info@minibean.com.hk" target="_top">info@minibean.com.hk</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{ "marginTop": "5px" }}>
                                {/*
                                <div id="articles-slider" className="general-box" style={{ "height": "180px" }}>

                                </div>
                                <div id="articles-slider" className="general-box" style={{ "height": "180px" }}>

                                </div>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1">
                </div>
            </div >
        )
    }
}


