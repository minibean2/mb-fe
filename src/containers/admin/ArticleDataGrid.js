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
var featuredArray = [];
var dataObject = [];
const rowGetter = rowNumber => rows[rowNumber];

export default class ArticleDataGrid extends Component {

    arrylist =[];
    constructor(props) {
        super(props);

        
        this.state = {selectedRows: [],selectedIndexes:[]};

        this.getAllArticles();
        //this.arrylist = [];
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
        featuredArray = [];
        $.get(configData.url + "api/articles").done((res) => {
            console.log("lead...........");
            console.log(res.res);
            for (let i = 0; i < res.res.length; i++) {
                res.res[i].id = (i+1);
                res.res[i].categoryName = res.res[i].category.name;
                res.res[i].post_date = moment(res.res[i].post_date).format("DD-MM-YYYY");
                res.res[i].created_date = moment(res.res[i].created_date).format("DD-MM-YYYY");
                if(res.res[i].featured == true){
                    featuredArray.push(res.res[i].id);
                }       
            }
            dataObject = res.res;
            console.log(featuredArray);
            this.setState({selectedIndexes: this.state.selectedIndexes.concat(featuredArray)});

            rows = res.res;
            console.log(rows);
            this.setState();
        });
    }

   
    onRowSelect(rows) { 
        console.log("selectedindex---",featuredArray, rows);
        featuredArray.push(rows[0].rowIdx);
        console.log(dataObject);
        console.log(rows,"featuredArray--",featuredArray); var articleIdList = [];
        var articleObject = {}; 
        var articleIdList = [];
        for (let i = 0; i < dataObject.length; i++) {
            for (let j = 0; j < featuredArray.length; j++) {
                  if((dataObject[i].id - 1) == featuredArray[j]){
                      articleIdList.push(dataObject[i]._id); 
                 }
            }
         
          
        }
        articleObject.articles = articleIdList;
        console.log(articleObject);
        $.post(configData.url + "api/update/featured", articleObject).done((res) => {
                    console.log("success");
                   

        });
         
        
    }

    onRowsDeselected(rows){
            console.log(rows);
            var index = featuredArray.indexOf(rows[0].rowIdx);
            featuredArray.splice(index,1);
            console.log("index",index);
            var articleObject = {}; 
            var articleIdList = [];
            for (let i = 0; i < dataObject.length; i++) {
                for (let j = 0; j < featuredArray.length; j++) {
                      if((dataObject[i].id - 1) == featuredArray[j]){
                          articleIdList.push(dataObject[i]._id); 
                     }
                }
             
              
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
                                rowHeight={50}
                                minHeight={600}
                                rowScrollTimeout={200}
                                rowSelection={{
                                    onRowsSelected: this.onRowSelect,
                                    onRowsDeselected: this.onRowsDeselected,
                                    selectBy: {
                                      indexes: featuredArray
                                    }
                                  }}/>
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


