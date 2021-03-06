import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import Dropdown from 'react-dropdown'
import config from '../RootConfig';
import TinyMCE from 'react-tinymce';

require('react-datepicker/dist/react-datepicker.css');

import Select from 'react-select';
var DatePicker = require('react-datepicker');
var moment = require('moment');
var $ = require('jquery');

const rows = [];
var options = [];
var selectedOption = {};
var cat = { "id": "0", "name": "" };
var htmlBody = "";
var publishedValue = true;
var featuredValue = true;
var defaultOption = "";
var articleId = "";
var postDate = moment();

const rowGetter = rowNumber => rows[rowNumber];

export default class CreateArticle extends Component {

    constructor(props) {
        super(props);

        var url = window.location.href;
        var urlArr = [];
        urlArr = url.split("=");
        articleId = urlArr[1];

        this.state = { published: false, featured: false, date: moment(), options:[] };
        $.get(config.API_URL + "api/article?id=" + articleId).done((res) => {
            $(".title").val(res.res.title);
            $(".preview").val(res.res.preview);
            $(".thumbnailUrl").val(res.res.thumbnailUrl);
            $(".imgUrl").val(res.res.imageUrl);
            htmlBody = res.res.body;
            cat = res.res.category;
            selectedOption = { "value": res.res.category.id, "label": res.res.category.name };
            //defaultOption = res.res.category.id;
            postDate = moment(res.res.post_date);
            featuredValue = res.res.featured;
            publishedValue = res.res.published;
            this.setState({ featured: res.res.featured, published: res.res.published, date: moment(res.res.post_date), defaultOption: res.res.category.id });
           // this.setState();
        });


        $.get(config.API_URL + "api/categories").done((res) => {
            //console.log(res);
            options = [];
            this.categories = res;
            for (var i = 0; i < this.categories.length; i++) {
                options.push({ "value": this.categories[i]._id, "label": this.categories[i].name });
            }

            this.setState({options : options});
        });

    }

    categoryChange(val) {
        var self = this;
        self.setState({
            defaultOption: val.value
        });
        selectedOption = val;
    }

    handleEditorChange = (e) => {
        //console.log('Content was updated:', e.target.getContent());
        htmlBody = e.target.getContent();
    }

    file_picker_callback(callback, value, meta) {
        if (meta.filetype == 'image') {
            $('#upload').trigger('click');
            $('#upload').on('change', function () {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function (e) {
                    callback(e.target.result, {
                        alt: ''
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }

    editArticle() {
        //console.log(selectedOption);
        if (selectedOption == {}) {
            selectedOption = this.state.options[0].value;
        }
        cat = { "id": selectedOption.value, "name": selectedOption.label };

        var data = {
            articleId: articleId,
            title: $(".title").val(),
            preview: $(".preview").val(),
            thumbnailUrl: $(".thumbnailUrl").val(),
            imageUrl: $(".imgUrl").val(),
            body: htmlBody,
            category: cat,
            featured: featuredValue,
            published: publishedValue,
            post_date: postDate._d,
            created_date: new Date()
        };

        //console.log("data----", data);
        $.post(config.API_URL + "api/article/update/" + articleId, data).done((res) => {
            //console.log("lead...........");
            browserHistory.push('/articleGrid');
        });
    }

    backPage() {
        browserHistory.push('/articleGrid');
    }

    publishedChangeChk(value) {
        //console.log(value);
        this.setState({
            published: !this.state.published
        })

        publishedValue = !this.state.published;
    }

    featuredChangeChk(value) {
        this.setState({
            featured: !this.state.featured
        })
        featuredValue = !this.state.featured;
    }

    dateChange(date) {
        var self = this;
        self.setState({
            date: date
        });
        postDate = date;

        //console.log(date);
    }

    render() {

        return (

            <div style={{ "marginTop": "72px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-md-1" style={{ "marginTop": "5px" }}>
                            </div>
                            <div className="col-md-10" style={{ "marginTop": "5px" }}>
                                <div className="general-box">
                                    <div className="col-md-12">
                                        <h1>Edit Article </h1>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group col-md-12">
                                        <div className="col-md-4">
                                            <label>Title</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control title col-md-8"
                                                name="title" />
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <div className="col-md-4">
                                            <label>Preview :</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control preview col-md-8"
                                                name="preview" />
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <div className="col-md-4">
                                            <label>Thumbnail Url :</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control thumbnailUrl col-md-8"
                                                name="thumbnailUrl" />
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <div className="col-md-4">
                                            <label>Image Url :</label>
                                        </div>
                                        <div className="col-md-8">
                                            <input type="text" className="form-control imgUrl col-md-8" name="imgUrl" />
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <div className="col-md-4">
                                            <label>Category :</label>
                                        </div>
                                        <div className="col-md-8">

                                            <Select
                                                name="form-field-name"
                                                value={this.state.defaultOption}
                                                options={this.state.options}
                                                onChange={this.categoryChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <div className="col-md-4">
                                            <label>Posted Date :</label>
                                        </div>
                                        <div className="col-md-8">
                                            <DatePicker dateFormat="DD-MM-YYYY" selected={this.state.date}
                                                onChange={this.dateChange.bind(this)} />
                                        </div>
                                    </div>
                                    <div className="form-group  col-md-12">
                                        <div className="col-md-4">
                                        </div>
                                        <div className="col-md-8">
                                            <div className="col-md-6">
                                                <input type="checkbox" checked={this.state.published}
                                                    onChange={this.publishedChangeChk.bind(this, this.state.published)} />&nbsp;&nbsp;
                                                Published
                                            </div>
                                            <div className="col-md-6">
                                                <input type="checkbox" checked={this.state.featured}
                                                    onChange={this.featuredChangeChk.bind(this, this.state.featured)} />&nbsp;&nbsp;
                                                Featured
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group col-md-12">
                                        <div className="col-md-12">
                                            <label>Html Body :</label>
                                        </div>
                                        <div className="col-md-12">

                                            <TinyMCE
                                                content={htmlBody}
                                                config={{
                                                    height: "400",
                                                    paste_data_images: true,
                                                    plugins: [
                                                        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                                                        "searchreplace wordcount visualblocks visualchars code fullscreen",
                                                        "insertdatetime media nonbreaking save table contextmenu directionality",
                                                        "emoticons template paste textcolor colorpicker textpattern imagetools codesample toc"
                                                    ],
                                                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | my browser value',
                                                    file_picker_callback: function (callback, value, meta) {
                                                        if (meta.filetype == 'image') {
                                                            $('#upload').trigger('click');
                                                            $('#upload').on('change', function () {
                                                                var file = this.files[0];
                                                                var reader = new FileReader();
                                                                reader.onload = function (e) {
                                                                    callback(e.target.result, {
                                                                        alt: ''
                                                                    });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            });
                                                        }
                                                    }
                                                }}

                                                file_picker_callback={this.file_picker_callback}
                                                onChange={this.handleEditorChange}
                                            />
                                        </div>
                                    </div>
                                    <input name="image" type="file" id="upload" onChange=""
                                        style={{ "display": "none" }} />
                                    <div className="form-group  col-md-12" style={{ "textAlign": "right" }}>
                                        <button
                                            className="btn btn-default" style={{ "marginRight": "10px" }}
                                            onClick={this.backPage.bind()}>
                                            Close
                                        </button>
                                        <button
                                            className="btn btn-default save-article" onClick={this.editArticle.bind()}>
                                            Save
                                        </button>
                                    </div>

                                    <div className="col-md-1" style={{ "marginTop": "5px" }}>
                                    </div>
                                    <div className="col-md-12" style={{ "marginTop": "5px" }}>
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



