import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import config from './RootConfig';
import constants from '../constants';

var $ = require('jquery');
var moment = require('moment');

const divs = [];
const data = [];

export default class ArticlePage extends Component {

    constructor(props) {
        super(props);
        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("=");
        this.articleId = urlArr[1];

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

    showBody(value) {
        if (value != null && value != "") {
            return (
                <span dangerouslySetInnerHTML={{ __html: value }}></span>
            )
        }
    }

    generateDivs() {

        let moreDivs = [];
        $.get(config.API_URL + "api/article?id=" + this.articleId).done((res) => {
            var article = res.res;
	    if (article.post_date != null) {
	            if (article.post_date != undefined) {
	                article.post_date = moment(article.post_date).format("MMM D, YYYY");
	            }
	    }
            moreDivs.push(
                <div key={res.res.category.id} className="general-box article-box-main" key={this.articleId}>
                    <ul className="article-detail-wrapper">
                        <li>
                            <Link to={'/category?id=' + article.category.id}>
                                <img className="scCatMiniThumbnail" src={article.thumbnailUrl} />
                            </Link>
                            <div style={{ "marginLeft": "10px", "width": "60%" }}>
                                <Link className="scCatName" to={'/category?id=' + article.category.id}>{article.category.name}</Link>
                                <h6>
                                    <font className="view-count">{article.post_date}</font>
                                </h6>
                            </div>
                        </li>
                        <li>
                            <font className="scTitle">{article.title}</font>
                        </li>
                        {/*<li>
                            <span className="view-count" style={{ "marginRight": "10px" }}><img className="view-icon" style={{ "verticalAlign": "sub" }} src="../lib/images/general/icons/view.png" />{article.nov}</span>
                        </li>*/}
                        <li><div style={{ "fontSize": "16px", "width": "100%" }}>{this.showBody(article.body)}</div></li>
                        {/*<li>
                            <span className="view-count" style={{ "marginRight": "10px" }}><img className="view-icon" style={{ "verticalAlign": "sub" }} src="../lib/images/general/icons/view.png" />{article.nov}</span>
                        </li>*/}
                        <li>
                            <div style={{ "margin": "20px 0", "fontSize": "16px" }}>
                                <div className="padding10" style={{ "borderTop": "1px solid #eee" }}></div>
                                分享連結:&nbsp; 
                                <input type='text' name='article-link' id='article-link' defaultValue={window.location.href}></input>
                                {/*<input type='text' name='article-link' id='article-link' defaultValue={config.SITE_URL + 'article?id=' + this.articleId}></input>*/}
                                {/*<a style={{"marginLeft":"5px","padding":"2px 7px","fontSize":"14px"}} className='toolsbox toolsbox-single' onclick='highlightLink("article-link")'><i className='glyphicon glyphicon-link'></i></a>*/}
                            </div>
                        </li>
                    </ul>
                </div >
            );

            this.setState({ divs: this.state.divs.concat(moreDivs) });
        });
    }

    render() {

        return (
            <div style={{ "marginTop": "50px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12" style={{ "marginTop": "5px" }}>
                                <div id="wall">
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


