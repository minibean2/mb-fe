import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
var Select = require('react-select');
import Dropdown from 'react-dropdown'
import config from '../../config';
import TinyMCE from 'react-tinymce';
var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');
var $ = require('jquery');

const rows = [];
var options = [];
var selectedOption = {};
var cat = { "id": "0", "name": "" };
var htmlBody = "";
var publishedValue = true;
var featuredValue = true;
const defaultOption = "";
var postDate = moment();

const rowGetter = rowNumber => rows[rowNumber];

export default class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.state = { published: true, featured: true, date: moment() };
        $.get(config.API_URL + "api/categories").done((res) => {
            console.log(res);
            this.categories = res;
            for (var i = 0; i < this.categories.length; i++) {
                options.push({ "value": this.categories[i]._id, "label": this.categories[i].name });
            }
            const defaultOption = options[0];
            this.setState();
        });

    }

    categoryChange(val) {
        console.log(val);
        selectedOption = val;
    }

    handleEditorChange = (e) => {
        console.log('Content was updated:', e.target.getContent());
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

    saveArticle() {
        if (selectedOption == {}) {
            selectedOption = options[0].value;
        }
        cat = { "id": selectedOption.value, "name": selectedOption.label };

        var data = {
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

        //var fullDate = new Date();
        //var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
        //var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        //data.created_date = currentDate;

        console.log("data----", data);
        $.post(config.API_URL + "api/article/save", data).done((res) => {
            console.log("lead...........");
            browserHistory.push('/articleGrid');
        });
    }

    backPage() {
        browserHistory.push('/articleGrid');
    }

    publishedChangeChk(value) {
        console.log(value);
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

        console.log(date);
    }

    render() {

        return (

            <div style={{ "margin-top": "72px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-md-1" style={{ "margin-top": "5px" }}>
                            </div>
                            <div className="col-md-10" style={{ "margin-top": "5px" }}>
                                <div className="general-box">
                                    <div className="col-md-12">
                                        <h1>Create Article </h1>
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
                                            <Dropdown options={options} onChange={this.categoryChange}
                                                value={defaultOption} />
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
                                                content=""
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
                                    <input name="image" type="file" id="upload" onchange=""
                                        style={{ "display": "none" }} />
                                    <div className="form-group  col-md-12" style={{ "textAlign": "right" }}>
                                        <button
                                            className="btn btn-default" style={{ "marginRight": "10px" }}
                                            onClick={this.backPage.bind()}>
                                            Close
                                        </button>
                                        <button
                                            className="btn btn-default save-article" onClick={this.saveArticle.bind()}>
                                            Save
                                        </button>
                                    </div>

                                    <div className="col-md-1" style={{ "margin-top": "5px" }}>
                                    </div>
                                    <div className="col-md-12" style={{ "margin-top": "5px" }}>
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



