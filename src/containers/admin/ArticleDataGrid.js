import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import configData from '../../config.js';
import ReactDataGrid from 'react-data-grid';

const {Editors, Toolbar, Formatters} = require('react-data-grid-addons');
var $ = require('jquery');

var moment = require('moment');

//const rows = [];
//const columns = [];
//columns = [{ key: '_id', name: 'ID' }, { key: 'articleName', name: 'ArticleName' },{ key: 'categoryName', name: 'categoryName' },{ key: 'postDate', name: 'PostedDate' },{ key: 'description', name: 'Description' }];
var columns = [];
var rows = [];

const rowGetter = rowNumber => rows[rowNumber];

export default class ArticleDataGrid extends Component {

    constructor(props) {
        super(props);

        
        this.state = {selectedRows: []};

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
                width: 150,
                resizable: true
            },
            {
                key: 'categoryName',
                name: 'Category',
                editable: true,
                width: 150,
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
	        key: 'post_date',
	        name: 'Posted Date',
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
                key: 'delete',
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
                res.res[i].id = (i+1);
                res.res[i].categoryName = res.res[i].category.name;
                res.res[i].post_date = moment(res.res[i].post_date).format("DD-MM-YYYY");
                res.res[i].created_date = moment(res.res[i].created_date).format("DD-MM-YYYY");
            }

            rows = res.res;
            console.log(rows);
            this.setState();
        });
    }

   
    onRowSelect(rows) {
        console.log(rows);
        var articleIdList = [];
        var articleObject = {};
        for (let i = 0; i < rows.length; i++) {
            articleIdList.push(rows[i].id);
        }
       
        articleObject.articles = articleIdList;
        console.log(articleObject);
          $.post(configData.url + "api/update/featured", articleObject).done((res) => {
            console.log("success");
           

        });
        
    }

    render() {

        return (

            <div style={{"margin-top": "80px"}}>
            <div className="col-md-1">
             </div>
             <div className="col-md-10">
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
                                rowKey="id"
                                columns={columns}
                                rowGetter={rowGetter}
                                rowsCount={rows.length}
                                onGridRowsUpdated={this.handleGridRowsUpdated}
                                enableRowSelect={true}
                                onRowSelect={this.onRowSelect}
                                onCellSelected={this.onCellSelected}
                                onCellDeSelected={this.onCellDeSelected}
                                rowHeight={50}
                                minHeight={600}
                                rowScrollTimeout={200}/>
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


