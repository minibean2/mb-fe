import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
var Select = require('react-select');
import Dropdown from 'react-dropdown'
import configData from '../config.js';
import TinyMCE from 'react-tinymce';
var $ = require('jquery');
//import ReactDataGrid from 'react-data-grid';

const rows = [];
var options = [];
var catId = "0";
var htmlBody = "";
var activeValue = true;
var featuredValue = true;
const defaultOption = "";

 
const rowGetter = rowNumber => rows[rowNumber];

export default class CreateArticle extends Component {
 
  constructor (props) {
    super(props);
     this.state = {active: true, featured:true};
     $.get(configData.url+"api/categories").done((res) => {
      console.log(res);
       this.categories = res;
      for(var i=0;i<this.categories.length;i++){
                options.push({"value":this.categories[i]._id,"label":this.categories[i].name});
            }
            const defaultOption = options[0];
            this.setState();
       });     
   
  }


logChange(val) {
  console.log(val);
  catId = val;

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
        if (catId == "0") {
            catId = options[0].value;
        }

        var data = {
            title: $(".title").val(),
            preview: $(".preview").val(),
            imageURL: $(".imgUrl").val(),
            body: htmlBody,
            category: catId,
            categoryId:catId.value,
            featured:featuredValue,
            status:activeValue
        };
var fullDate = new Date();
var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
 
var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
data.created_date = currentDate;

           console.log("data----",data);
           $.post(configData.url+"api/article/save",data).done((res) => {
           console.log("lead...........");
           browserHistory.push('/articleGrid');
         
        }); 
}

BackPage(){
    browserHistory.push('/articleGrid');
}

activeChangeChk(value){
    console.log(value);
     this.setState({
        active: !this.state.active      
    })

      activeValue = !this.state.active;
}

featuredChangeChk(value){
      this.setState({
        featured: !this.state.featured      
    })
      featuredValue = !this.state.featured;
}

  render() {

        return (

            <div style={{"margin-top": "80px"}}>
                <div className="themeA-container">
                    <div className="row">
                        <div className="col-md-1" style={{"margin-top": "5px"}}>
                        </div>
                        <div className="col-md-10" style={{"margin-top": "5px"}}>
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
                                               name="title"/>
                                    </div>
                                </div>
                                <div className="form-group  col-md-12">
                                    <div className="col-md-4">
                                        <label>Preview :</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control preview col-md-8"
                                               name="preview"/>
                                    </div>
                                </div>
                                <div className="form-group  col-md-12">
                                    <div className="col-md-4">
                                        <label>Thumbnail Image :</label>
                                    </div>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control imgUrl col-md-8" name="imgUrl"/>
                                    </div>
                                </div>
                                <div className="form-group  col-md-12">
                                    <div className="col-md-4">
                                        <label>Category :</label>
                                    </div>
                                    <div className="col-md-8">
                                        <Dropdown options={options} onChange={this.logChange} value={defaultOption}/>
                                    </div>
                                </div>
                                <div className="form-group  col-md-12">
                                 <div className="col-md-4">
                                 </div>
                                  <div className="col-md-8">

                                      <div  className="col-md-6">
                                        <input type="checkbox" checked={this.state.active} onChange={this.activeChangeChk.bind(this, this.state.active)} />&nbsp;&nbsp;Active
                                      </div>
                                      <div  className="col-md-6">
                                        <input type="checkbox"  checked={this.state.featured} onChange={this.featuredChangeChk.bind(this, this.state.featured)}/>&nbsp;&nbsp;Featured
                                      </div>
                                  </div>  
                                </div>

               </div>
               
                  
                   

              
            </div>

           
            <div className="form-group col-md-12">
               <div className="col-md-12">
                      <label>Html Body :</label>
               </div>
               <div className="col-md-12"> 
                 
                     <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
        height: "400", 
          paste_data_images: true,
           plugins: [
              "autolink link image lists print preview",
              "emoticons template paste textcolor colorpicker textpattern"
          ],
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | my browser value',
           file_picker_callback: function(callback, value, meta) {
            if (meta.filetype == 'image') {
              $('#upload').trigger('click');
              $('#upload').on('change', function() {
                var file = this.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
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
                                <input name="image" type="file" id="upload" onchange="" style={{"display": "none"}}/>
                                <div className="form-group  col-md-12" style={{"textAlign": "right"}}>
                                    <button
                                        className="btn btn-default" style={{"marginRight": "10px"}}
                                        onClick={this.BackPage.bind()}>
                                        Close
                                    </button>
                                    <button
                                        className="btn btn-default save-article" onClick={this.saveArticle.bind()}>
                                        Save
                                    </button>
                                </div>
                           
                        <div className="col-md-1" style={{"margin-top": "5px"}}>
                        </div>
                        <div className="col-md-12" style={{"margin-top": "5px"}}>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}



