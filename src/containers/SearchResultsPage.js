import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import config from '../config';
import constants from '../constants';

var $ = require('jquery');
var moment = require('moment');

const GITHUB_REPO = 'https://github.com/reactjs/redux'
const margin = {
    margin: 0
}
const oneImg = {
    width: 100,
    height: 26
}
const sliderImg = {
    width: 100
}
const setWidth = {
    width: 210
}
const setColorFont = {
    color: "Yellow",

}
const setHeight = {
    height: 100,

}
const width500 = {
    width: 500
}
const getColor = {
    color: "red"
}

const marginLeft = {
    marginLeft: 10
}

const divs = [];
const data = [];

export default class SearchResultsPage extends Component {

    constructor(props) {
        super(props);
        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("/");
        this.searchKey = urlArr[urlArr.length - 1];

        this.state = { divs: divs };
        this.generateDivs = this.generateDivs.bind(this);
        this.generateDivs();
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

    generateDivs() {

        let moreDivs = [];
        $.get(config.API_URL + "api/search?key=" + this.searchKey).done((res) => {
            console.log(res);
            let moreDivs = [];
            if (res.res.length == 0) {
                this.stopLoading = true;
            }

            for (let i = 0; i < res.res.length; i++) {
                var searchResult = res.res[i];
                if (searchResult != undefined) {
                    moreDivs.push(
                        <div style={{ "paddingBottom": "15px" }} key={'searchResult-'+searchResult.title}>
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

            this.setState({ divs: this.state.divs.concat(moreDivs) });
        });
    }

    render() {

        return (
            <div style={{ "margin-top": "50px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{ "margin-top": "5px" }}>
                                <div className="general-box">
                                    <div style={{ "paddingBottom": "10px" }}>
                                        <div>
                                            <h4 style={{ "paddingLeft": "25px" }}>Search: <i>{unescape(this.searchKey)}</i></h4>
                                        </div>
                                    </div>
                                    {this.state.divs}
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


