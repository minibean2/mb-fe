import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'

import HomePage from './containers/HomePage'
import ArticlePage from './containers/ArticlePage'
import SearchResultsPage from './containers/SearchResultsPage'
import AboutPage from './containers/AboutPage'

import AdminArticleDataGrid from './containers/admin/ArticleDataGrid'
import AdminCreateArticle from './containers/admin/CreateArticle'
import AdminEditArticle from './containers/admin/EditArticle'
import AdminImgUpload from './containers/admin/ImgUpload'
import AdminLogin from './containers/admin/Login'

export default
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/category" component={HomePage} />
        <Route path="/article" component={ArticlePage} />
        <Route path="/searchResults" component={SearchResultsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/login" component={AdminLogin} />
        <Route path="/articleGrid" component={AdminArticleDataGrid} />
        <Route path="/createArticle" component={AdminCreateArticle} />
        <Route path="/editArticle" component={AdminEditArticle} />
        <Route path="/imgUpload" component={AdminImgUpload} />
    </Route>
