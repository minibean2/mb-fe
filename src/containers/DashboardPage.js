import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
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

var imgs = [];
var items = [];
export default class DashboardPage extends Component {

    constructor() {
        super();
        this.state = {divs: divs};
        this.htmlCategories = [];
        this.generateDivs = this.generateDivs.bind(this);
        this.count = 0;
        this.flag = 0;

        this.pageSize = 5;
        this.scrollThreshold = 0.5;

        $.get(configData.url + "api/categories").done((res) => {
            console.log(res);

            this.categories = res;
            this.categoriesFunction();
            this.generateDivs();
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

    categoriesClick(value) {
        console.log(value);
        this.flag = 0;
        var arr = [];
        this.state = {divs: arr, img: []};
        this.count = 0;
        if (value == "All articles") {

            // $.get(configData.url+"api/articles").done((res) => {
            // this.res = res.res;
            this.state = {divs: []};
            this.count = 0;
            this.generateDivs();
            //});
        } else {

            $.get(configData.url + "api/article/category/" + value).done((res) => {
                console.log(res);
                this.flag = 1;
                this.state = {divs: divs};
                arr = res.res;
                this.res = arr;

                this.generateCatDivs();
            });
        }


    }

    articleClick(articleId) {
        var arr = [];
        this.state = {divs: arr};
        this.count = 0;
        console.log(articleId);
        $.get(configData.url + "api/article?articleId=" + articleId).done((res) => {
            console.log(res);

            this.state = {divs: divs};
            arr.push(res.res);
            console.log(arr);
            this.res = arr;
            console.log(this.res);

            this.generateDivs();
        });
    }

    categoriesFunction() {
        console.log(this.categories);
        let menu = [];
        for (let i = 0; i < this.categories.length; i++) {
            menu.push(<a className="row col-md-12" style={{"font-size": "17px"}}
                         onClick={this.categoriesClick.bind(this, this.categories[i]._id)}>{this.categories[i].name}</a>);
        }
        setTimeout(() => {
            this.htmlCategories = menu;
        }, 500);
    }

    generateCatDivs() {
        console.log(this.state.divs);
        console.log(this.count);

        let moreDivs = [];
        for (let i = 0; i < this.res.length; i++) {
            // console.log(res.res[i]._id);
            //var id = res.res[i]._id;
            this.res[i].post_date = moment(this.res[i].post_date).format("MMM D, YYYY");
            moreDivs.push(
                <div>
                    <div className="general-box">
                        <ul className="allpost-wrapper">
                            <li><Link to={'/article/' + this.res[i]._id}><img src={this.res[i].imageUrl}/></Link>
                                <h4 style={getColor}><Link to={'/article/' + this.res[i]._id}>{this.res[i].title}</Link>
                                </h4>
                                <div>
                                    <h6>
                                        <a className="tag"
                                           onClick={this.categoriesClick.bind(this, this.res[i].category.id)}>{this.res[i].category.name}</a>
                                        <font className="admin-visible-field">{this.res[i].post_date}</font>
                                        <span className="view-count" style={marginLeft}><img className="view-icon"
                                                                                             src="view.png"/>view</span>

                                    </h6>
                                </div>
                            </li>
                        </ul>
                        <ul className="allpost-wrapper">
                            {this.showBody(this.res[i].preview)}
                        </ul>
                        <span></span>
                    </div>
                </div>
            );
            if (this.res[i].featured === true) {
                items.push(this.res[i]);

            }

            this.count++;

        }

        setTimeout(() => {
            this.setState({divs: this.state.divs.concat(moreDivs)});
        }, 500);

    }

    showBody(value) {
        if (value != null && value != "") {
            return (
                <div dangerouslySetInnerHTML={{__html: value}}></div>
            )

        }
    }

    generateDivs() {
        items = [];
        if (this.flag == 0) {
            console.log(this.state.divs);
            console.log(this.count);

            let moreDivs = [];
            let img = [];
            $.get(configData.url + "api/articles?start=" + this.count + "&limit=" + this.pageSize).done((res) => {
                console.log(res);
                for (let i = 0; i < 6; i++) {
                    console.log(res.res[i]._id);
                    //var id = res.res[i]._id;
                    res.res[i].post_date = moment(res.res[i].post_date).format("MMM D, YYYY");
                    moreDivs.push(
                        <div>
                            <div className="general-box">
                                <ul className="allpost-wrapper">
                                    <li><Link to={'/article/' + res.res[i]._id}><img src={res.res[i].imageUrl}/></Link>
                                        <h4 style={getColor}><Link
                                            to={'/article/' + res.res[i]._id}>{res.res[i].title}</Link></h4>
                                        <div>
                                            <h6>
                                                <a className="tag"
                                                   onClick={this.categoriesClick.bind(this, res.res[i].category.id)}>{res.res[i].category.name}</a>
                                                <font className="admin-visible-field">{res.res[i].post_date}</font>
                                                <span className="view-count" style={marginLeft}><img
                                                    className="view-icon" src="view.png"/>view</span>
                                            </h6>
                                            <div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <ul className="allpost-wrapper">
                                    {this.showBody(res.res[i].preview)}
                                </ul>
                                <span></span>
                            </div>
                        </div>
                    );
                    if (res.res[i].featured === true) {
                        items.push(res.res[i]);

                    }

                    this.count++;
                }

            });

            setTimeout(() => {
                this.setState({divs: this.state.divs.concat(moreDivs)});
            }, 500);
        }

    }

    showBody(value) {
        console.log(value);
        if (value != null && value != "") {

            return (
                <div dangerouslySetInnerHTML={{__html: value}}></div>
            )

        }
    }

    render() {

        var settings = {
            className: '',
            dots: true,
            infinite: true,
            slidesToShow: 1,
            speed: 2000,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            rtl: true,
        };

        return (


            <div style={{"margin-top": "80px"}}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{"margin-top": "5px"}}>
                                <div id="articles-slider" className="general-box">
                                    <a className="row col-md-12" style={{"font-size": "17px"}}
                                       onClick={this.categoriesClick.bind(this, 'All articles')}>All articles</a>
                                    {this.htmlCategories}
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{"margin-top": "5px"}}>
                                <div>
                                    <div>
                                        <div className="general-box" style={{"height": "180px", "width": "100%"}}>

                                            <Slider {...settings}>
                                                <div>
                                                    {items.map(function (object, i) {
                                                        return <div style={{"position": "relative", "width": "100%"}}>
                                                            <Link to={'/article/' + object._id}><img key={i}
                                                                                                     style={{
                                                                                                         "width": "100%",
                                                                                                         "height": "180px"
                                                                                                     }}
                                                                                                     src={object.imageUrl}/><span
                                                                style={{
                                                                    "position": "absolute",
                                                                    "top": "147px",
                                                                    "left": "0",
                                                                    "width": "100%",
                                                                    "fontSize": "20px"
                                                                }}>{object.title}</span></Link></div>
                                                    })}
                                                </div>
                                            </Slider>

                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <InfiniteScroll
                                            scrollThreshold={this.scrollThreshold}
                                            next={this.generateDivs}
                                            hasMore={true}
                                            loader={<h4>Loading...</h4>}>
                                            {this.state.divs}
                                        </InfiniteScroll>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{"margin-top": "5px"}}>
                                <div id="articles-slider" className="general-box" style={{"height": "90px"}}>

                                </div>
                                <div id="articles-slider" className="general-box" style={{"height": "90px"}}>

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
