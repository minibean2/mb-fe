import React, { Component, PropTypes } from 'react'
import { Link,browserHistory } from 'react-router'
import DropzoneComponent from 'react-dropzone-component';
//var ReactDOMServer = require('react-dom/server');
var $ = require ('jquery');
 
var urlPath = "http://localhost:9000/";
const rows = [];
var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: urlPath+'api/image/upload'
};

var djsConfig = { addRemoveLinks: true }


//var eventHandlers = { addedfile: (file) => console.log(file) }
 var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];
var eventHandlers = {
    // This one receives the dropzone object as the first parameter
    // and can be used to additional work with the dropzone.js
    // object
    init: null,
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
   addedfile: (file) => console.log(file),
   removedfile:null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter
    // and are only called if the uploadMultiple option
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecomplete: null
}

export default class ImgUpload extends Component {
 
  constructor (props) {
    super(props); 
    this.state = {file: '',imagePreviewUrl: ''};
   
  }


  render() {

    return (
      
      <div style={{"margin-top":"80px"}}>
        <div className="themeA-container">
            <div className="row">
            <div className="col-md-2" style={{"margin-top" : "5px"}}>
                 
               
            </div>
             <div className="col-md-8" style={{"margin-top" : "5px"}}>
              <div className="general-box">
                     <div className="col-md-12">
               <h1>Images Upload</h1>

            </div>
          
            <div className="form-group col-md-12">
                   <DropzoneComponent config={componentConfig}
                       eventHandlers={eventHandlers}
                       djsConfig={djsConfig} />,
            </div>
            <hr></hr>
           
            
           
              </div>
             </div> 
            <div className="col-md-2" style={{"margin-top" : "5px"}}>
                 
               
            </div>
              
            <div className="col-md-12" style={{"margin-top" : "5px"}}>
                
            </div>
           

           
           </div>
         </div>
      </div>
       
    )
  }
}


