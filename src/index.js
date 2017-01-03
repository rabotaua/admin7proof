import React from "react";
import ReactDOM from "react-dom";

import {Router, Route, IndexRoute, browserHistory} from "react-router"

import Layout from './Pages/Layout'
import MainPage from './Pages/Main'
import AboutPage from './Pages/About'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={MainPage}/>
            <Route path="/about" component={AboutPage}/>
        </Route>
    </Router>,
    document.getElementById('root')
);