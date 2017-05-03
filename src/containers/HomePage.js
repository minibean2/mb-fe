import React, { Component, PropTypes } from "react";
import { Link } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import config from '../config';
import constants from '../constants';

// Fix: http://stackoverflow.com/a/34130767
var Slider = require('react-slick').default;

var $ = require('jquery');
var moment = require('moment');

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

var imgs = [];
var items = [{
    id: "0",
    title: "",
    imageUrl: ""
}];

export default class HomePage extends Component {

    constructor() {
        super();
        this.state = { divs: divs };
        this.htmlCategories = [];
        this.generateDivs = this.generateDivs.bind(this);
        this.count = 0;
        this.flag = 0;
        this.catId = 0;
        this.stopLoading = false;
        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("=");
        this.catId = urlArr[1];

        this.pageSize = constants.INFINITE_SCROLL_PAGE_SIZE;
        this.scrollThreshold = constants.INFINITE_SCROLL_THRESHOLD;

        this.setfeaturedImg();

        $.get(config.API_URL + "api/categories").done((res) => {
            console.log(res);

            this.categories = res;
            this.categoriesFunction();
            console.log(this.catId);
            if (this.catId != "" && this.catId != null) {
                this.categoryClick(this.catId);
            } else {
                $(".spinner").toggle(true);
                this.catId = 0;
                this.generateDivs();
            }
        });
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

    categoryClick(value) {
        console.log(value);
        this.flag = 0;
        var arr = [];
        this.state = { divs: arr, img: [] };
        this.count = 0;
        this.stopLoading = false;
        $(".stopLoadingMsg").toggle(false);
        if (value == constants.CATEGORIES_ALL) {
            this.catId = 0;
            this.count = 0;
            this.state = { divs: [] };
            this.generateDivs();
        } else {
            this.catCount = 0;
            this.catId = value;
            this.generateDivs();
        }
    }

    articleClick(articleId) {
        var arr = [];
        this.state = { divs: arr };
        this.count = 0;
        console.log(articleId);
        $.get(config.API_URL + "api/article?id=" + articleId).done((res) => {
            this.state = { divs: divs };
            arr.push(res.res);
            console.log(arr);
            this.res = arr;
            this.generateDivs();
        });
    }

    categoriesFunction() {
        console.log(this.categories);
        let menu = [];
        for (let i = 0; i < this.categories.length; i++) {
            menu.push(
                <li className="index-item" key={"category-" + i}>
                    <div className="selected-item">
                        <a className="nav-item"
                            style={{ "color": "#324fe1", "fontWeight": "bold" }}
                            onClick={this.categoryClick.bind(this, this.categories[i]._id)}>{this.categories[i].name}</a>
                    </div>
                </li>
            );
        }

        this.htmlCategories = menu;
    }

    showBody(value) {
        if (value != null && value != "") {
            return (
                <span dangerouslySetInnerHTML={{ __html: value }}></span>
            )
        }
    }

    setfeaturedImg() {
        $.get(config.API_URL + "api/featured-articles").done((res) => {
            items = [];
            for (let i = 0; i < res.res.length; i++) {
                items.push(res.res[i]);
            }
        });
    }

    generateDivs() {

        let moreDivs = [];
        if (this.stopLoading) {
            $(".spinner").toggle(false);
            $(".stopLoadingMsg").toggle(true);
        } else {
            $(".spinner").toggle(true);
            $(".stopLoadingMsg").toggle(false);

            if (this.catId == 0) {
                if (this.flag == 0) {
                    console.log(this.state.divs);
                    console.log(this.count);

                    let img = [];
                    $.get(config.API_URL + "api/articles?start=" + this.count + "&limit=" + this.pageSize).done((res) => {
                        console.log(res);
                        let moreDivs = [];
                        if (res.res.length == 0) {
                            this.stopLoading = true;
                        }

                        for (let i = 0; i < res.res.length; i++) {
                            var articleItem = res.res[i];
                            if (articleItem != undefined) {
                                if (articleItem.post_date != undefined) {
                                    articleItem.post_date = moment(articleItem.post_date).format("MMM D, YYYY");
                                }

                                moreDivs.push(
                                    <div style={{ "borderBottom": "#bcbcbc solid thin" }} key={"article-" + articleItem._id}>
                                        <ul className="allpost-wrapper">
                                            <li>
                                                <Link to={'/article?id=' + articleItem._id}><img src={articleItem.imageUrl} /></Link>
                                                <div>
                                                    <Link to={'/article?id=' + articleItem._id}>
                                                        <h4 style={{ "color": "#324fe1" }}>{articleItem.title}</h4>
                                                    </Link>
                                                    <h6>
                                                        {/*}
                                                    <a className="tag" onClick={this.categoryClick.bind(this, articleItem.category.id)}>
                                                        {articleItem.category.name}
                                                    </a>
                                                    */}
                                                        <span className="tag">{articleItem.category.name}</span>
                                                        <font className="view-count">{articleItem.post_date}</font>
                                                        {/*<span className="view-count" style={marginLeft}><img className="view-icon" src="../lib/images/general/icons/view.png" />{articleItem.nov}</span>*/}
                                                    </h6>
                                                    <p>{this.showBody(articleItem.preview)}...</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                );



                                this.count++;
                            }
                        }

                        this.setState({ divs: this.state.divs.concat(moreDivs) });
                    });
                }
            } else {
                let moreDivsCat = [];
                console.log(this.catCount);

                $.get(config.API_URL + "api/article/category/" + this.catId + "?start=" + this.catCount + "&limit=" + this.pageSize).done((res) => {
                    console.log(res);
                    let moreDivs = [];
                    if (res.res.length == 0) {
                        this.stopLoading = true;
                    }

                    for (let i = 0; i < res.res.length; i++) {
                        var articleItem = res.res[i];
                        if (articleItem != undefined) {
                            if (articleItem.post_date != undefined) {
                                articleItem.post_date = moment(articleItem.post_date).format("MMM D, YYYY");
                            }

                            moreDivsCat.push(
                                <div style={{ "borderBottom": "#bcbcbc solid thin" }}>
                                    <ul className="allpost-wrapper">
                                        <li>
                                            <Link to={'/article?id=' + articleItem._id}><img src={articleItem.imageUrl} /></Link>
                                            <div>
                                                <Link to={'/article?id=' + articleItem._id}>
                                                    <h4 style={{ "color": "#324fe1" }}>{articleItem.title}</h4>
                                                </Link>
                                                <h6>
                                                    {/*}
                                                <a className="tag" onClick={this.categoryClick.bind(this, articleItem.category.id)}>
                                                    {articleItem.category.name}
                                                </a>
                                                */}
                                                    <span className="tag">{articleItem.category.name}</span>
                                                    <font className="view-count">{articleItem.post_date}</font>
                                                    <span className="view-count" style={marginLeft}><img className="view-icon" src="../lib/images/general/icons/view.png" />{articleItem.nov}</span>
                                                </h6>
                                                <p>{this.showBody(articleItem.preview)}...</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            );



                            this.catCount++;
                        }
                    }
                    this.setState({ divs: this.state.divs.concat(moreDivsCat) });
                });
            }
        }
    }

    showBody(value) {
        console.log(value);
        if (value != null && value != "") {
            return (
                <span dangerouslySetInnerHTML={{ __html: value }}></span>
            )
        }
    }

    /*
    componentDidMount () {

    }
    */

    render() {
        var settings = {
            dots: true,
            arrows: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToScroll: 1
        };

        let values = 0;

        let articleImgs = (<div></div>);

        articleImgs = (
            items.map(function (object, i) {
                return <div style={{ "position": "relative", "width": "100%" }} key={"slider-image-" + i}>
                    <Link to={'/article?id=' + object._id}>
                        <img key={"sliderImage-" + i}
                            style={{
                                "width": "100%",
                                "height": "250px"
                            }}
                            src={object.imageUrl} />
                        <span
                            style={{
                                "position": "absolute",
                                "bottom": "15px",
                                "left": "15px",
                                "width": "90%",
                                "fontSize": "20px",
                                "color": "white",
                                "zIndex": "10"
                            }}>
                            {object.title}
                        </span>
                        <img
                            style={{
                                "position": "absolute",
                                "top": "0",
                                "left": "0",
                                "width": "100%",
                                "height": "250px"
                            }}
                            src="../lib/images/general/gradient_black_30.png" />
                    </Link>
                </div>
            })
        )

        console.log("articleImgs ", articleImgs);

        return (
            <div style={{ "marginTop": "50px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{ "marginTop": "5px" }}>
                                <div className="general-box top-box article-index-box">
                                    <div id="nav-subbar" style={{ "margin": "0px" }}>
                                        <ul className="nav-menu">
                                            <li>
                                                <div className="index-title">
                                                    <img style={{ "width": "auto", "height": "26px" }}
                                                        src="../lib/images/general/titles/hot_articles.png" />
                                                </div>
                                            </li>
                                            <li className="index-item">
                                                <div className="selected-item">
                                                    <a className="nav-item"
                                                        style={{ "color": "#324fe1", "fontWeight": "bold" }}
                                                        onClick={this.categoryClick.bind(this, constants.CATEGORIES_ALL)}>{constants.CATEGORIES_ALL}</a>
                                                </div>
                                            </li>
                                            {this.htmlCategories}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ "marginTop": "5px" }}>
                                <div>
                                    <div>
                                        <div className="general-box">
                                            <Slider {...settings}>
                                                {articleImgs}
                                            </Slider>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="general-box">
                                        <InfiniteScroll
                                            scrollThreshold={this.scrollThreshold}
                                            next={this.generateDivs}
                                            hasMore={true}
                                            loader={<div><img className="center-img spinner" style={{ "display": "none" }} src="../lib/images/general/animated/gray-spinner.gif" /></div>}>
                                            {this.state.divs}
                                        </InfiniteScroll>
                                    </div>
                                </div>
                                <label className="stopLoadingMsg" style={{ "display": "none", }}></label>

                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{ "marginTop": "5px" }}>
                                {/*
                                <div id="articles-slider" className="general-box" style={{ "height": "180px" }}>

                                </div>
                                <div id="articles-slider" className="general-box" style={{ "height": "180px" }}>

                                </div>
                                */}
                                <div className="pull-right">
                                    <div id="fb-btn-set">
                                        <a className="fb-link-btn" href="https://www.facebook.com/minibean.com.hk"
                                            target="_blank"><span>小萌豆 miniBean</span></a>
                                        <iframe className="fb-like-btn" frameBorder="0" scrolling="no"
                                            allowTransparency="true"
                                            src="https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Fminibean.com.hk&amp;send=false&amp;layout=button_count&amp;width=305&amp;action=like&amp;colorscheme=light&amp;font&amp;height=30&amp;locale=zh_HK&amp;show_faces=0"></iframe>
                                    </div>
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
