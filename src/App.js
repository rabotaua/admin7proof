import React, {Component} from "react"
import {Router, Route, IndexRoute, browserHistory} from "react-router"

import Layout from './Pages/Layout'
import MainPage from './Pages/Main'
import AboutPage from './Pages/About'


class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={MainPage}/>
                    <Route path="/about" component={AboutPage}/>
                </Route>
            </Router>
        );
    }
}

export default App;