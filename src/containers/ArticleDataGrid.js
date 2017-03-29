import React, { Component, PropTypes } from 'react'
import { Link,browserHistory } from 'react-router'
//import InfiniteScroll from 'react-infinite-scroll-component';
//var Slider = require('react-slick');
var $ = require ('jquery');
import ReactDataGrid from 'react-data-grid';
 
const columns = [];
columns = [{ key: '_id', name: 'ID' }, { key: 'articleName', name: 'ArticleName' },{ key: 'description', name: 'Description' }];
const rows = [];
 
const rowGetter = rowNumber => rows[rowNumber];

export default class RepoPage extends Component {
 
  constructor (props) {
    super(props);
    
    this.getAllArticale(); 
   
  }

createArticle(){
  console.log("hiiiiiOpen");
  //window.open(url, '_blank');
  browserHistory.push('/createArticle');
}

getAllArticale(){

  $.get("http://localhost:9000/api/articles").done((res) => {
           console.log("lead...........");
           console.log(res.res);
           
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
      
      <div style={{"margin-top":"80px"}}>
        <div className="themeA-container">
            <div className="row">
             
           
                  <div className="col-md-12" style={{"margin-top" : "5px","textAlign":"right","marginBottom":"16px","marginTop":"15px"}}>
                  <button className="btn btn-default" onClick={this.createArticle}>Create Article</button>
               
            </div>
            <div className="col-md-12">
           
              <ReactDataGrid columns={columns}
             rowGetter={rowGetter}
              rowsCount={rows.length}
               minHeight={500} 
              onDoubleClick={this.onClick}/>
            </div>

           
           
            

           </div>
         </div>
      </div>
       
    )
  }
}


