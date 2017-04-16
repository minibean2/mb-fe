import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component';
import configData from '../config.js';
var Slider = require('react-slick');
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

export default class ArticlePage extends Component {

    constructor(props) {
        super(props);
        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("/");
        this.articleId = urlArr[urlArr.length - 1];

        this.state = { divs: divs };
        this.htmlCategories = [];
        this.generateDivs = this.generateDivs.bind(this);
        this.count = 0;
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

    categoriesClick(value) {
        var arr = [];
        this.state = { divs: arr };
        this.count = 0;
        if (value == "All articles") {

            $.get(configData.url + "api/articles").done((res) => {
                this.res = res.res;
                this.generateDivs();
            });
        } else {

            $.get(configData.url + "api/article/category/" + value).done((res) => {
                console.log(res);

                this.state = { divs: divs };
                arr = res.res;
                this.res = arr;

                this.generateDivs();
            });
        }
    }

    showBody(value) {
        if (value != null && value != "") {
            return (
                <span dangerouslySetInnerHTML={{ __html: value }}></span>
            )
        }
    }

    generateDivs() {

        let moreDivs = [];
        $.get(configData.url + "api/article?articleId=" + this.articleId).done((res) => {
            res.res.post_date = moment(res.res.post_date).format("MMM D, YYYY");
            moreDivs.push(
                <div className="general-box article-box-main">
                    <ul className="article-detail-wrapper">
                        <li>
                            <Link to={'/categoryId=' + res.res.category.id}>
                                <img className="scCatMiniThumbnail" src={res.res.thumbnailUrl} />
                            </Link>
                            <div style={{ "margin-left": "10px", "width": "60%" }}>
                                <Link className="scCatName" to={'/categoryId=' + res.res.category.id}>{res.res.category.name}</Link>
                                <h6>
                                    <font className="admin-visible-field">{res.res.post_date}</font>
                                </h6>
                            </div>
                        </li>
                        <li>
                            <font className="scTitle">{res.res.title}</font>
                        </li>
                        <li>
                            <span className="view-count" style={{ "margin-right": "10px" }}><img className="view-icon" style={{ "vertical-align": "sub" }} src="../lib/images/general/icons/view.png" />{res.res.nov}</span>
                        </li>
                        <li><div style={{ "font-size": "16px", "width": "100%;" }}>{this.showBody(res.res.body)}</div></li>
                        <li>
                            <span className="view-count" style={{ "margin-right": "10px" }}><img className="view-icon" style={{ "vertical-align": "sub" }} src="../lib/images/general/icons/view.png" />{res.res.nov}</span>
                        </li>
                        <li>
                            <div style={{ "margin": "20px 0", "font-size": "16px" }}>
                                <div className="padding10" style={{ "border-top": "1px solid #eee" }}></div>
                                分享連結:&nbsp;
                                <input type='text' name='article-link' id='article-link' value={configData.url + 'article/' + this.articleId}></input>
                                {/*<a style={{"margin-left":"5px","padding":"2px 7px","font-size":"14px"}} className='toolsbox toolsbox-single' onclick='highlightLink("article-link")'><i className='glyphicon glyphicon-link'></i></a>*/}
                            </div>
                        </li>
                    </ul>
                </div >
            );

        });

        setTimeout(() => {
            this.setState({ divs: this.state.divs.concat(moreDivs) });
        }, 500);

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
                                <div id="wall">
                                    {this.state.divs}
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{ "margin-top": "5px" }}>
                                <div id="articles-slider" className="general-box" style={{ "height": "180px" }}>

                                </div>
                                <div id="articles-slider" className="general-box" style={{ "height": "180px" }}>

                                </div>
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


