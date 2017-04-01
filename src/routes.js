import React from 'react'
import {Route} from 'react-router'
import App from './containers/App'
import DashboardPage from './containers/DashboardPage'
import ArticlePage from './containers/ArticlePage'
import ArticleDataGrid from './containers/ArticleDataGrid'
import CreateArticle from './containers/CreateArticle'
import ImgUpload from './containers/ImgUpload'
import Login from './containers/Login'

export default
<Route path="/user" component={App}>
    <Route path="/" component={DashboardPage}/>
    <Route path="/dashboard" component={DashboardPage}/>
    <Route path="/article/:id" component={ArticlePage}/>
    <Route path="/articleGrid" component={ArticleDataGrid}/>
    <Route path="/createArticle" component={CreateArticle}/>
    <Route path="/upload" component={ImgUpload}/>
    <Route path="/login" component={Login}/>
</Route>
