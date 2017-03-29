/*import React, { Component, PropTypes } from 'react'
import { Link,browserHistory } from 'react-router'
import TinyMCE from 'react-tinymce';
var $ = require ('jquery');
 

const rows = [];


export default class Editor extends Component {
 
  constructor (props) {
    super(props); 
   
  }


handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
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
               <h1>Editor</h1>

            </div>
            <div className="col-md-12">
                 <TinyMCE
        content="<p>This is the initial content of the editor</p>"
        config={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        onChange={this.handleEditorChange}
      />

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


*/