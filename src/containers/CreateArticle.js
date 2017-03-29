import React, { Component, PropTypes } from 'react'
import { Link,browserHistory } from 'react-router'
var Select = require('react-select');
//import InfiniteScroll from 'react-infinite-scroll-component';
//var Slider = require('react-slick');
import TinyMCE from 'react-tinymce';
var $ = require ('jquery');
//import ReactDataGrid from 'react-data-grid';

 

const rows = [];
var options = [];
var catId = "0";
var htmlBody = "";
var urlPath = "http://localhost:9000/";
 
const rowGetter = rowNumber => rows[rowNumber];

export default class RepoPage extends Component {
 
  constructor (props) {
    super(props);
   
   
  }


logChange(val) {
  console.log(val);
  catId = val.value;
}

handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
    htmlBody = e.target.getContent();
  }

  file_picker_callback(callback, value, meta) {
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


getOptions(input, callback) {
  setTimeout(function() {

     $.get(urlPath+"api/categories").done((res) => {
      console.log(res);
       this.categories = res;
      for(var i=0;i<this.categories.length;i++){
                options.push({"value":this.categories[i]._id,"label":this.categories[i].name});
            }
         
       
          callback(null, {
           
    
      options: options,
     
      complete: true
    });
       
     });
    
  }, 500);
};

saveArticle(){
   var data = {
               articleName  : $(".articleName").val(),
               description  : $(".description").val(),
               body  : htmlBody,
               categorie : catId
              
           };

           console.log("data----",data);
           $.post(urlPath+"api/article/save",data).done((res) => {
           console.log("lead...........");
           // this.setState();
          
        }); 
}

BackPage(){
    browserHistory.push('/articleGrid');
}


  render() {

/*tinymce.init({
  selector: "textarea",  // change this value according to your HTML
  plugins: "paste",
  menubar: "edit",
  toolbar: "paste",
  paste_data_images: true
});*/

    return (
      
      <div style={{"margin-top":"80px"}}>
        <div className="themeA-container">
            <div className="row">
            <div className="col-md-1" style={{"margin-top" : "5px"}}>
                 
               
            </div>
             <div className="col-md-10" style={{"margin-top" : "5px"}}>
              <div className="general-box">
                     <div className="col-md-12">
               <h1>Create Article </h1>

            </div>
            <hr></hr>
            <div className="form-group col-md-12">
               <div className="col-md-4">
                    <label>Article Name</label>
               </div>
               <div className="col-md-8">
                    <input type="text" className="form-control articleName col-md-8" name="articleName"/>
               </div>
            </div>
            <div className="form-group  col-md-12">
               <div className="col-md-4">
                    <label>Description :</label>
               </div>
               <div className="col-md-8">
                    <input type="text" className="form-control description col-md-8" name="description"/>
               </div>
            </div>
            <div className="form-group  col-md-12">
               <div className="col-md-4">
                    <label>Categorie :</label>
               </div>
               <div className="col-md-8">
                   <Select.Async className="categorie" 
    name="form-field-name" 
    onChange={this.logChange}
    loadOptions={this.getOptions}
/>
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
             <input name="image" type="file" id="upload" onchange="" style={{"display":"none"}}/>
            <div className="form-group  col-md-12" style={{"textAlign":"right"}}>

            <button
        className="btn btn-default" style={{"marginRight":"10px"}} onClick={this.BackPage.bind()}
       >Close</button>
                <button
        className="btn btn-default save-article" onClick={this.saveArticle.bind()}
       >Save</button>
            </div>
              </div>
             </div> 
            <div className="col-md-1" style={{"margin-top" : "5px"}}>
                 
               
            </div>
              
            <div className="col-md-12" style={{"margin-top" : "5px"}}>
                
            </div>
           

           
           </div>
         </div>
      </div>
       
    )
  }
}



