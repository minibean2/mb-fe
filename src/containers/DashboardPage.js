import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import InfiniteScroll from 'react-infinite-scroll-component';
var Slider = require('react-slick');
var $ = require ('jquery');
//var InfiniteScroll = require('react-infinite-scroll-component');
var urlPath = "http://localhost:9000/";

const GITHUB_REPO = 'https://github.com/reactjs/redux'
 const margin = {
         margin: 0
     }
     const oneImg = {
         width:100,
         height:26
     }
     const sliderImg = {
         width:100
     }
     const setWidth = {
        width:210
     }
     const setColorFont = {
        color:"Yellow",
        
     }
     const setHeight = {
        height:100,
        
     }
     const width500 = {
        width:500
     }
     const getColor = {
        color:"red"
     } 

     const marginLeft = {
        marginLeft:10
     }
   
const divs = [];
const data = [];



export default class DashboardPage extends Component {
 


  constructor () {
    super();
    this.state = {divs: divs};
    this.htmlCategories = [];
    this.generateDivs = this.generateDivs.bind(this);
    this.count = 0;
     this.flag = 0;
    $.get(urlPath+"api/categories").done((res) => {
      console.log(res);
     
           this.categories = res;
         this.categoriesFunction();
         this.generateDivs();
     }); 
    
    //$.get("http://192.168.1.67:9000/api/articles").done((res) => {
     //      this.res = res.res;
         
    // }); 

    
   
  }


  getDivs = () => {
    return this.divs;
  }

  getInputValue = () => {
    return this.refs.input.value
  }

  setInputValue = (val) => {
   
    this.refs.input.value = val
  }
  
   categoriesClick(value) {
    console.log(value);
    this.flag = 0;
     var arr = [];
          this.state = {divs: arr};
          this.count = 0;
    if(value == "All articles"){

         $.get(urlPath+"api/articles").done((res) => {
           this.res = res.res;
           this.generateDivs();
        }); 
    }else{
          
        $.get(urlPath+"api/article/category/"+value).done((res) => {
          console.log(res);
          this.flag = 1;
          this.state = {divs: divs};
          arr = res.res;
           this.res = arr;
           
          this.generateCatDivs();
       }); 
    }
   

    }

    articleClick(articleId){
        var arr = [];
          this.state = {divs: arr};
          this.count = 0;
         console.log(articleId);
         $.get(urlPath+"api/article?articleId="+articleId).done((res) => {
          console.log(res);
         
          this.state = {divs: divs};
          console.log("mmmmm9999000");
          arr.push(res.res);
          console.log(arr);
           this.res = arr;
           console.log(this.res);
           
          this.generateDivs();
       }); 
    }

categoriesFunction(){
   console.log(",.,.,.,.,");
        console.log(this.categories);
         let menu = [];
        for(let i=0;i < this.categories.length;i++){
            menu.push(<a className="col-md-12" style={{"font-size" : "17px"}} onClick={this.categoriesClick.bind(this, this.categories[i]._id)}>{this.categories[i].name}</a>);
        }
         setTimeout(() => {
              this.htmlCategories = menu;
            }, 500);
}

  generateCatDivs () {

     


console.log("hiii");
    
           console.log("sccessssss");
       
          
          console.log(this.state.divs);
          console.log(this.count);
            let moreDivs = [];
            console.log(this.count);
         
           //  console.log(res);
                for (let i = 0; i < this.res.length; i++) {
           // console.log(res.res[i]._id);
            //var id = res.res[i]._id;
              moreDivs.push(
               <div><div className="general-box"><ul className="allpost-wrapper"><li><a href="abcd.com"><img src="../lib/images/article/cat_5.jpg"/></a>
                                            <h4 style={getColor}><Link to={'/article/'+this.res[i]._id}>{this.res[i].articleName}</Link></h4>
                                           
                                              <div>
                                                  <a>
                                                      <span>{this.res[i].description}</span>
                                                  </a>
                                                  <h6>
                                                      <a className="tag">Amit</a>
                                                      <font className="admin-visible-field" >02/02/2017</font>
                                                      <span className="view-count" style={marginLeft}><img className="view-icon" src="view.png"/>view</span>
                                                
                                                  </h6>
                                                
                                              </div>
                                             
                                          </li>
                                      </ul>
                                       <ul className="allpost-wrapper">
                                           {this.showBody(this.res[i].body)}
                                      </ul>
                                      <span></span>
                                </div>
                              </div>
              );
        
               this.count++;         
            }

         
           
           
            setTimeout(() => {
              this.setState({divs: this.state.divs.concat(moreDivs)});
            }, 500);
  
  }

showBody(value){
  console.log(value);
   if(value != null && value != ""){
    
      return(
      <div dangerouslySetInnerHTML={{__html: value}}></div>
    )

   }
    

}

  generateDivs () {

     
  			if(this.flag == 0){

console.log("hiii");
    
           console.log("sccessssss");
       
          
          console.log(this.state.divs);
          console.log(this.count);
            let moreDivs = [];
            console.log(this.count);
          $.get(urlPath+"api/articles?start="+this.count+"&end=3").done((res) => {
             console.log(res);
                for (let i = 0; i < 6; i++) {
            console.log(res.res[i]._id);
            //var id = res.res[i]._id;
              moreDivs.push(
               <div><div className="general-box"><ul className="allpost-wrapper"><li><a href="abcd.com"><img src="../lib/images/article/cat_5.jpg"/></a>
                                            <h4 style={getColor}><Link to={'/article/'+res.res[i]._id}>{res.res[i].articleName}</Link></h4>
                                           
                                              <div>
                                                  <a>
                                                      <span>{res.res[i].description}</span>
                                                  </a>
                                                  <h6>
                                                      <a className="tag">Amit</a>
                                                      <font className="admin-visible-field" >02/02/2017</font>
                                                      <span className="view-count" style={marginLeft}><img className="view-icon" src="view.png"/>view</span>
                                                
                                                  </h6>
                                                <div>
                                              
                                                                                                   
                                                </div>
                                                
                                              </div>
                                          </li>
                                      </ul>
                                      <ul className="allpost-wrapper">
                                           {this.showBody(res.res[i].body)}
                                      </ul>
                                      <span></span>
                                </div>
                              </div>
              );
        
               this.count++;         
            }

           }); 
           
           
            setTimeout(() => {
              this.setState({divs: this.state.divs.concat(moreDivs)});
            }, 500);
  			}

  
  }


showBody(value){
  console.log(value);
   if(value != null && value != ""){
    
      return(
      <div dangerouslySetInnerHTML={{__html: value}}></div>
    )

   }
    

}

  render() {


   var settings = {
      className: '',
      dots: true,
      infinite: true,
      slidesToShow: 1,
      speed: 2000,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      rtl: true,
    };


   
   
    return (
   

       <InfiniteScroll
                        next={this.generateDivs}
                        hasMore={true}
                        loader={<h4>Loading...</h4>}>
      <div style={{"margin-top":"80px"}}>
        <div className="themeA-container">
            <div className="row">
              <div className="col-md-3" style={{"margin-top" : "5px"}}>
                 <div id="articles-slider" className="general-box">
                    
                        
                    <a className="col-md-12" style={{"font-size" : "17px"}} onClick={this.categoriesClick.bind(this, 'All articles')}>All articles</a>
                        {this.htmlCategories}

                    
                 </div>
                 
               
            </div>
       

            <div className="col-md-6" style={{"margin-top" : "5px"}}>
                  <div>
                      <div>
                        <div className="general-box" style={{"height" : "180px","width" : "100%"}}>
                     
                               
                                    
                                  
                                     <Slider {...settings}>
                                        <a href="/articles#!/article/3/4">
                                              <img style={{"width" : "100%"}} src="../lib/images/logo-xmas.gif"/>
                                        </a>
                                        <a href="/articles#!/article/3/4">
                                              <img style={{"width" : "100%"}} src="../lib/images/article/cat_6.jpg"/>
                                        </a>
                                        <a href="/articles#!/article/3/4">
                                              <img style={{"width" : "100%"}} src="../lib/images/article/cat_7.jpg"/>
                                        </a>
                                        <a href="/articles#!/article/3/4">
                                              <img style={{"width" : "100%"}} src="../lib/images/article/cat_2.jpg"/>
                                        </a>
                                        
                                      </Slider>


                            
                            
                         </div>
                    </div>
                  </div>
                 
                  <div>
                  <div>

                     
                        {this.state.divs}
                     
                  </div>
                    


                  

                  </div>
                 



                  
                  
              </div>
           </div>
         </div>
      </div>
       </InfiniteScroll>
    )
  }
}
