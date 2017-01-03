import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import Layout from "./Pages/Layout";
import MainPage from "./Pages/Main";
import AboutPage from "./Pages/About";

// need for material-ui
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

//material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


ReactDOM.render(
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={MainPage}/>
                <Route path="/about" component={AboutPage}/>
            </Route>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);