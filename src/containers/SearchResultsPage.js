import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import config from '../config';
import constants from '../constants';

var $ = require('jquery');
var moment = require('moment');

const divs = [];

export default class SearchResultsPage extends Component {

    constructor(props) {
        super(props);

        this.searchKey = "";
        this.state = { divs: divs };
        this.generateDivs = this.generateDivs.bind(this);

        this.setSearchKey();
        this.generateDivs();
    }

    setSearchKey() {
        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("=");
        this.searchKey = urlArr[1];
    }

    generateDivs() {
        console.log('generateDivs...');

        let moreDivs = [];
        $.get(config.API_URL + "api/search?key=" + this.searchKey).done((res) => {
            console.log(res);
            let moreDivs = [];
            if (res.res.length == 0) {
                moreDivs.push(
                    <div style={{ "paddingBottom": "15px" }} key={'noResult'}>
                        <ul className="allpost-wrapper">
                            <div>
                                <h4>
                                    <span className="tag">沒有搜尋結果</span>
                                </h4>
                            </div>
                        </ul>
                    </div>
                );
            } else {
                for (let i = 0; i < res.res.length; i++) {
                    var searchResult = res.res[i];
                    if (searchResult != undefined) {
                        moreDivs.push(
                            <div style={{ "paddingBottom": "15px" }} key={'searchResult-' + searchResult.title}>
                                <ul className="allpost-wrapper">
                                    <div>
                                        <a href={searchResult.url}>
                                            <h4 style={{ "color": "#324fe1" }}>{searchResult.title}</h4>
                                        </a>
                                        <h6>
                                            <span className="tag">{searchResult.desc}</span>
                                        </h6>
                                    </div>
                                </ul>
                            </div>
                        );
                    }
                }
            }

            //this.setState({ divs: this.state.divs.concat(moreDivs) });
            this.setState({ divs: moreDivs });
        });
    }

    componentDidMount() {
        console.log('componentDidMount...');

        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps...');

        this.setSearchKey();
        this.generateDivs();
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
                                <div className="general-box" style={{ "minHeight": "500px" }}>
                                    <div style={{ "paddingBottom": "10px" }}>
                                        <div>
                                            <h4 style={{ "paddingLeft": "25px" }}>搜尋: {unescape(this.searchKey)}</h4>
                                        </div>
                                    </div>
                                    {this.state.divs}
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
            </div>
        )
    }
}


