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
var items = [{
    id: "0",
    title: "No Result",
    imageUrl: ""
}];
export default class HomePage extends Component {

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
            menu.push(
                <li className="index-item">
                    <div className="selected-item">
                        <a className="nav-item"
                           style={{"color": "#324fe1", "font-weight": "bold"}}
                           onClick={this.categoriesClick.bind(this, this.categories[i]._id)}>{this.categories[i].name}</a>
                    </div>
                </li>
            );
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
                <div style={{"border-bottom": "#bcbcbc solid thin"}}>
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
                        <div style={{"border-bottom": "#bcbcbc solid thin"}}>
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
                                                className="view-icon"
                                                src="../lib/images/general/icons/view.png"/>view</span>
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
            adaptiveHeight: true,
            dots: true,
            infinite: true,
            slidesToShow: 1,
            speed: 500,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            swipe: true,
            rtl: false,
        };

        let values = 0; 

        let articleImgs = (<div></div>);
      
            articleImgs = (

                items.map(function (object, i) {
                                                       
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
                                    
                })
            )

     
console.log("articleImgs ", articleImgs);
        return (

            <div style={{"margin-top": "72px"}}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{"margin-top": "5px"}}>
                                <div className="general-box top-box article-index-box">
                                    <div id="nav-subbar" style={{"margin": "0px"}}>
                                        <ul className="nav-menu">
                                            <li>
                                                <div className="index-title">
                                                    <img style={{"width": "auto", "height": "26px"}}
                                                         src="../lib/images/general/titles/hot_articles.png"/>
                                                </div>
                                            </li>
                                            <li className="index-item">
                                                <div className="selected-item">
                                                    <a className="nav-item"
                                                       style={{"color": "#324fe1", "font-weight": "bold"}}
                                                       onClick={this.categoriesClick.bind(this, 'All articles')}>所有文章</a>
                                                </div>
                                            </li>
                                            {this.htmlCategories}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{"margin-top": "5px"}}>
                                <div>
                                    <div>
                                        <div className="general-box" style={{"height": "300px", "width": "100%"}}>
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
                                            loader={<h4>Loading...</h4>}>
                                            {this.state.divs}
                                        </InfiniteScroll>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12" style={{"margin-top": "5px"}}>
                                <div id="articles-slider" className="general-box" style={{"height": "180px"}}>

                                </div>
                                <div id="articles-slider" className="general-box" style={{"height": "180px"}}>

                                </div>
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
