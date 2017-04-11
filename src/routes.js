import React from 'react'
import {Route} from 'react-router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import ArticlePage from './containers/ArticlePage'
import AdminArticleDataGrid from './containers/admin/ArticleDataGrid'
import AdminCreateArticle from './containers/admin/CreateArticle'
import AdminImgUpload from './containers/admin/ImgUpload'
import AdminLogin from './containers/admin/Login'

export default
<Route path="/user" component={App}>
    <Route path="/" component={HomePage}/>
    <Route path="/article/:id" component={ArticlePage}/>
    <Route path="/login" component={AdminLogin}/>
    <Route path="/articleGrid" component={AdminArticleDataGrid}/>
    <Route path="/createArticle" component={AdminCreateArticle}/>
    <Route path="/imgUpload" component={AdminImgUpload}/>
    <Route path="/:id" component={HomePage}/>
</Route>
