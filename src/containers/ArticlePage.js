import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
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

        this.state = {divs: divs};
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
        this.state = {divs: arr};
        this.count = 0;
        if (value == "All articles") {

            $.get(configData.url + "api/articles").done((res) => {
                this.res = res.res;
                this.generateDivs();
            });
        } else {

            $.get(configData.url + "api/article/category/" + value).done((res) => {
                console.log(res);

                this.state = {divs: divs};
                arr = res.res;
                this.res = arr;

                this.generateDivs();
            });
        }


    }

    showBody(value) {
        if (value != null && value != "") {
            return (
                <div dangerouslySetInnerHTML={{__html: value}}></div>
            )
        }
    }

    generateDivs() {

        let moreDivs = [];
        $.get(configData.url + "api/article?articleId=" + this.articleId).done((res) => {
            res.res.post_date = moment(res.res.post_date).format("MMM D, YYYY");
            moreDivs.push(
                <div className="general-box">
                    <div className="col-md-12 col-sm-12" style={{"textAlign": "center","marginTop": "10px"}}>
                        <div className="col-md-2 col-sm-2">
                            <a>
                                <img style={{"width": "82px","borderRadius":"9%"}} src="../lib/images/article/cat_2.jpg"/>
                            </a>
                        </div>
                        <div className="col-md-10 col-sm-10 form-group" style={{"textAlign":"left"}}>
                            <div className="col-md-12 col-sm-12">
                                       <a> {res.res.category.name}</a>
                            </div>
                            <div className="col-md-12 col-sm-12">
                                       <label style={{"fontSize":"11px"}}>Posted on {res.res.post_date}</label>
                            </div>
                        </div>
                    </div>
                     <div className="col-md-12 col-sm-12" style={{"textAlign": "left"}}>
                            <h2 className="col-md-12 col-sm-12">
                                        {res.res.title}
                            </h2>
                     </div>
                    <div className="col-md-12 col-sm-12" style={{"textAlign": "center"}}>
                        {this.showBody(res.res.preview)}
                    </div>
                </div>
            );

        });

        setTimeout(() => {
            this.setState({divs: this.state.divs.concat(moreDivs)});
        }, 500);

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

            <div style={{"margin-top": "72px"}}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-md-3" style={{"margin-top": "5px"}}>
                                    
                            </div>
                            <div className="col-md-6" style={{"margin-top": "5px"}}>
                                

                               {this.state.divs}
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


