import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component';
import configData from '../config.js';
var Slider = require('react-slick');
var $ = require ('jquery');

 
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

         $.get(configData.url+"api/articles").done((res) => {
           this.res = res.res;
           this.generateDivs();
        }); 
    }else{
          
        $.get(configData.url+"api/article/category/"+value).done((res) => {
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
            moreDivs.push(
                <div className="general-box">
                    <div className="col-md-12 col-sm-12" style={{"textAlign": "center"}}>
                        <div className="col-md-1 col-sm-1"></div>
                        <div className="col-md-10 col-sm-10">
                            <a>
                                <img style={{"width": "300px"}} src="../lib/images/article/cat_2.jpg"/>
                            </a>
                        </div>
                        <div className="col-md-1 col-sm-1"></div>
                    </div>
                    <div className="col-md-12 col-sm-12" style={{"text-align": "center"}}>
                        <ul className="allpost-wrapper">
                            <li>
                                <h4 style={getColor}><a>{res.res.title}</a></h4>
                                <div>
                                    <h6>
                                        <font className="admin-visible-field">{res.res.created_date}</font>
                                        <span className="view-count" style={marginLeft}>
                                            <img className="view-icon" src="view.png"/>
                                            View
                                        </span>
                                    </h6>
                                </div>
                            </li>
                        </ul>
                        <span></span>
                    </div>
                    <div className="col-md-12 col-sm-12" style={{"textAlign": "center"}}>
                        {this.showBody(res.res.body)}
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

            <div style={{"margin-top": "80px"}}>
                <div className="themeA-container">
                    <div className="row">
                        <div className="col-md-3" style={{"margin-top": "5px"}}>
                        </div>
                        <div className="col-md-6" style={{"margin-top": "5px"}}>
                            <div>
                                <div>
                                    <div className="general-box" style={{"height": "180px", "width": "100%"}}>
                                        <a>
                                            <img style={{"width": "100%"}} src="../lib/images/logo-xmas.gif"/>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div>
                                    {this.state.divs}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


