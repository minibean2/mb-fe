import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import configData from '../config.js';
const {Editors, Toolbar, Formatters} = require('react-data-grid-addons');
var $ = require('jquery');
import ReactDataGrid from 'react-data-grid';

//const rows = [];
//const columns = [];
//columns = [{ key: '_id', name: 'ID' }, { key: 'articleName', name: 'ArticleName' },{ key: 'categoryName', name: 'categoryName' },{ key: 'postDate', name: 'PostedDate' },{ key: 'description', name: 'Description' }];
var columns = [];
var rows = [];

const rowGetter = rowNumber => rows[rowNumber];

export default class ArticleDataGrid extends Component {

    constructor(props) {
        super(props);

        this.getAllArticles();
        var mi = this;
        columns = [
            {
                key: '_id',
                name: 'ID',
                width: 100,
                resizable: true
            },
            {
                key: 'title',
                name: 'Title',
                editable: true,
                width: 200,
                resizable: true
            },
            {
                key: 'categoryName',
                name: 'Category',
                editable: true,
                width: 200,
                resizable: true
            },
            {
                key: 'created_date',
                name: 'Created Date',
                editable: true,
                width: 200,
                resizable: true
            },
            {
                key: 'preview',
                name: 'Preview',
                editable: true,
                width: 220,
                resizable: true
            },
            {
                key: 'dontReading',
                name: ' ',
                width: 100,
                resizable: true,
                formatter: <a onClick={this.deleteClick.bind(this) }>Delete</a>,
                events: {
                    onClick: function (ev, args) {
                        console.log('The user double clicked on title column');
                        console.log(ev);
                        console.log(args);
                        console.log(rows[args.rowIdx]);
                        $.get(configData.url + "api/article/delete/" + rows[args.rowIdx]._id).done((res) => {
                            mi.getAllArticles();
                            mi.setState();

                        });

                    }
                }
            }

        ];
    }


    deleteClick(value) {
        console.log("delete");
        console.log(value);
    }

    createArticle() {
        console.log("hiiiiiOpen");
        //window.open(url, '_blank');
        browserHistory.push('/createArticle');
    }

    getAllArticles() {

        $.get(configData.url + "api/articles").done((res) => {
            console.log("lead...........");
            console.log(res.res);
            for (let i = 0; i < res.res.length; i++) {
                res.res[i].categoryName = res.res[i].category.label;
            }
            rows = res.res;
            console.log(rows);
            this.setState();

        });
    }

    onClick(cell) {
        console.log("select");
        console.log(cell);
    }

    render() {

        return (

            <div style={{"margin-top": "80px"}}>
                <div className="themeA-container">
                    <div className="row">

                        <div className="col-md-12" style={{
                            "margin-top": "5px",
                            "textAlign": "right",
                            "marginBottom": "16px",
                            "marginTop": "15px"
                        }}>
                            <button className="btn btn-default" onClick={this.createArticle}>Create Article</button>
                        </div>
                        <div className="col-md-12">

                            <ReactDataGrid
                                enableCellSelect={true}
                                columns={columns}
                                rowGetter={rowGetter}
                                rowsCount={rows.length}
                                onGridRowsUpdated={this.handleGridRowsUpdated}
                                enableRowSelect={true}
                                rowHeight={50}
                                minHeight={600}
                                rowScrollTimeout={200}/>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}


