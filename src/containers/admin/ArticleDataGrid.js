import React, { Component, PropTypes } from 'react'
import { Link, browserHistory } from 'react-router'
import config from '../RootConfig';
import ReactDataGrid from 'react-data-grid';
import ConfirmLink from 'react-confirm-dialog';
import { Modal, Button } from 'react-bootstrap';

//const { Editors, Toolbar, Formatters } = require('react-data-grid-addons');
var $ = require('jquery');

var moment = require('moment');

//const rows = [];
//const columns = [];
//columns = [{ key: '_id', name: 'ID' }, { key: 'articleName', name: 'ArticleName' },{ key: 'categoryName', name: 'categoryName' },{ key: 'postDate', name: 'PostedDate' },{ key: 'description', name: 'Description' }];
var columns = [];
var rows = [];
var featuredArray = [];
var dataObject = [];
var deleteRowId = 0;
var self = "";
const rowGetter = rowNumber => rows[rowNumber];

// Custom Formatter component
const BooleanFormatter = React.createClass({

    render() {
        const value = this.props.value ? 'Yes' : '';
        const color = this.props.value ? 'green' : 'red';
        return (
            <div style={{ color: color }}>
                {value}
            </div>
        );
    }
});

export default class ArticleDataGrid extends Component {

    arrylist = [];
    constructor(props) {
        super(props);

        this.state = { selectedRows: [], selectedIndexes: [] };
        self = this;
        this.getAllArticles();
        //this.arrylist = [];
        var mi = this;
        columns = [
            {
                key: 'published',
                name: 'Published?',
                width: 50,
                resizable: false,
                formatter: BooleanFormatter
            },
            {
                key: 'featured',
                name: 'Featured?',
                width: 50,
                resizable: false,
                formatter: BooleanFormatter
            },
            /*
            {
                key: '_id',
                name: 'ID',
                width: 50,
                resizable: true
            },
            {
                key: 'created_date',
                name: 'Created Date',
                editable: true,
                width: 150,
                resizable: true
            },
            */
            {
                key: 'post_date',
                name: 'Posted Date',
                editable: true,
                width: 150,
                resizable: true
            },
            {
                key: 'categoryName',
                name: 'Category',
                editable: true,
                width: 100,
                resizable: true
            },
            {
                key: 'title',
                name: 'Title',
                editable: true,
                width: 400,
                resizable: true
            },
            /*
            {
                key: 'preview',
                name: 'Preview',
                editable: true,
                width: 300,
                resizable: true
            },
            */
            {
                key: 'delete',
                name: ' ',
                width: 65,
                resizable: true,
                formatter: <ConfirmLink
                    action={this.deleteClick}
                    actionArgs={this}
                    confirmMessage="Delete this article?"
                    confirmText="Yes"
                    cancelText="No">
                    <a href="#">Delete</a>
                </ConfirmLink>,
                events: {
                    onClick: function (ev, args) {
                        //console.log('The user double clicked on title column');
                        //console.log(ev);
                        //console.log(args);
                        //console.log(rows[args.rowIdx]);
                        deleteRowId = rows[args.rowIdx]._id;
                    }
                }
            },
            {
                key: 'Edit',
                name: ' ',
                width: 65,
                resizable: true,
                formatter:<ConfirmLink><a>Edit</a></ConfirmLink>,
                events: {
                    onClick: function (ev, args) {
                        //console.log('The user double clicked on title column');
                        //console.log(ev);
                        //console.log(args);
                        //console.log(rows[args.rowIdx]);
                        browserHistory.push('/EditArticle?id=' + rows[args.rowIdx]._id);
                    }
                }
            }

        ];
    }

    deleteClick(value) {

        //console.log(deleteRowId);
        $.get(config.API_URL + "api/article/delete/" + deleteRowId).done((res) => {
            self.getAllArticles();
            self.setState({selectedRows:[], selectedIndexes:[]});

        });
    }

    createArticle() {
        //window.open(url, '_blank');
        browserHistory.push('/createArticle');
    }

    getAllArticles() {
        featuredArray = [];
        $.get(config.API_URL + "api/articles?all=true").done((res) => {
            //console.log(res.res);
            for (let i = 0; i < res.res.length; i++) {
                res.res[i].id = i;
                res.res[i].categoryName = res.res[i].category.name;
                res.res[i].post_date = moment(res.res[i].post_date).format("MMM D, YYYY h:mA");
                res.res[i].created_date = moment(res.res[i].created_date).format("MMM D, YYYY h:mA");
                if (res.res[i].featured == true) {
                    featuredArray.push(res.res[i].id);
                }
            }
            dataObject = res.res;
            //console.log(featuredArray);

            rows = res.res;
            //console.log(rows);
            this.setState({selectedRows:[], selectedIndexes:[]});
        });
    }

    onRowSelect(rows) {
        //console.log("selectedindex---", featuredArray, rows);
        featuredArray.push(rows[0].rowIdx);
        //console.log(dataObject);
        //console.log(rows, "featuredArray--", featuredArray); var articleIdList = [];
        //console.log(featuredArray);
    }

    onRowsDeselected(rows) {
        //console.log(rows);
        var index = featuredArray.indexOf(rows[0].rowIdx);
        featuredArray.splice(index, 1);
        //console.log("index", index);
        //console.log(featuredArray);
    }

    saveFeatured() {
        var articleObject = {};
        var articleIdList = [];

        for (let i = 0; i < dataObject.length; i++) {
            for (let j = 0; j < featuredArray.length; j++) {
                if (dataObject[i].id == featuredArray[j]) {
                    articleIdList.push(dataObject[i]._id);
                }
            }
        }
        articleObject.articles = articleIdList;

        $.post(config.API_URL + "api/featured-articles/update", articleObject).done((res) => {
            //console.log("success");
            $(".msgShow").toggle(true);
        });
    }

    render() {

        return (
            <div style={{ "marginTop": "80px" }}>
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="themeA-container">
                        <div className="row">
                            <div className="col-md-12" style={{
                                "marginTop": "5px",
                                "textAlign": "right",
                                "marginBottom": "16px",
                                "marginTop": "15px"
                            }}>
                                {/*<button
                                    className="btn btn-default" style={{ "marginRight": "13px" }}
                                    onClick={this.createArticle}>Create Article</button>*/}
                                {/*<button
                                    className="btn btn-default"
                                    onClick={this.saveFeatured.bind()}>Save featured</button>*/}
                            </div>
                            <div className="col-md-12">
                                <label className="msgShow" style={{ "display": "none", "color": "green" }}>featured saved successfully</label>
                            </div>
                            <div className="col-md-12">

                                <ReactDataGrid
                                    rowKey="id"
                                    columns={columns}
                                    rowGetter={rowGetter}
                                    rowsCount={rows.length}
                                    rowHeight={50}
                                    minHeight={600}
                                    rowScrollTimeout={200}
                                    //rowSelection={{
                                    //    onRowsSelected: this.onRowSelect,
                                    //    onRowsDeselected: this.onRowsDeselected,
                                    //    selectBy: {
                                    //        indexes: featuredArray
                                    //    }
                                    //}}
                                />
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


