import React, {Component, PropTypes} from 'react'
import {Link, browserHistory} from 'react-router'
import DropzoneComponent from 'react-dropzone-component';
import configData from '../../config.js';

var $ = require('jquery');

const rows = [];

const urlList = [];
var componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: configData.url + 'api/image/upload'
};

var djsConfig = {addRemoveLinks: true}


//var eventHandlers = { addedfile: (file) => console.log(file) }
var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];

export default class ImgUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: '', menu: []};
    }

    urlListTag() {
        var mi = this;
        $(".msgShow").toggle(true);
        this.htmlCategories = [];
        let menu = [];
        for (let i = 0; i < urlList.length; i++) {
            console.log(urlList[i]);
            var arr = [];
            arr = urlList[i].split(',');
            console.log(arr[0]);
            console.log(arr[1]);
            menu.push(<a className="col-md-12"
                         style={{"font-size": "17px"}}>{configData.url + arr[0].substring(1, arr[0].length)}</a>);
            menu.push(<a className="col-md-12"
                         style={{"font-size": "17px"}}>{configData.url + arr[1].substring(1, arr[1].length)}
                <hr></hr>
            </a>);
        }

        mi.setState({menu: menu});
    }


    render() {

        let menu = [];
        let mi = this;
        const eventHandlers = {
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
            removedfile: null,
            thumbnail: null,
            error: null,
            processing: null,
            uploadprogress: null,
            sending: null,
            success: (file, response) => {
                console.log(response);
                urlList.push(response.url_300 + "," + response.url_600);
                console.log(urlList);
                this.urlListTag();

            },
            complete: (data) => console.log(data),
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


        return (

            <div style={{"margin-top": "72px"}}>
                <div className="themeA-container">
                    <div className="row">
                        <div className="col-md-2" style={{"margin-top": "5px"}}>


                        </div>
                        <div className="col-md-8" style={{"margin-top": "5px"}}>
                            <div className="general-box">
                                <div className="col-md-12">
                                    <h1>Images Upload</h1>

                                </div>

                                <div className="form-group col-md-12">
                                    <DropzoneComponent config={componentConfig}
                                                       eventHandlers={eventHandlers}
                                                       djsConfig={djsConfig}/>,
                                </div>
                                <hr></hr>
                                <div className="form-group col-md-12">
                                    <label className="msgShow" style={{"display": "none", "color": "green"}}>Image
                                        Upload successfully</label>
                                </div>
                                <div className="form-group col-md-12">
                                    {this.state.menu}
                                </div>


                            </div>
                        </div>
                        <div className="col-md-2" style={{"margin-top": "5px"}}>


                        </div>

                        <div className="col-md-12" style={{"margin-top": "5px"}}>

                        </div>


                    </div>
                </div>
            </div>

        )
    }
}


