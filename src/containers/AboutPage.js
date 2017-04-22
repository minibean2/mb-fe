import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import config from '../config';
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
            <div style={{ "margin-top": "50px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{ "margin-top": "5px" }}>
                                <div className="general-box" style={{ "minHeight": "600px" }}>
                                    <div style={{ "paddingBottom": "10px" }}>
                                        <div>
                                            <h4 style={{ "paddingLeft": "25px" }}>About miniBean</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{ "margin-top": "5px" }}>
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
            </div>
        )
    }
}


