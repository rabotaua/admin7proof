import React from "react"
import ReactDOM from "react-dom"
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import Layout from "./Pages/Layout"
import MainPage from "./Pages/Main"
import AboutPage from "./Pages/About"
import LoginPage from "./Pages/Login"
import NotFoundPage from './Pages/404'

// need for material-ui
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

//material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import authHighOrderComponent from './Components/authHoc'

const signOut = () => {
    localStorage.removeItem('auth');
    fetch('https://admin7.azurewebsites.net/logout', {method: 'POST', headers: {'Content-Type': 'application/json'}})
        .then(() => browserHistory['replace']('/login'))
}

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={authHighOrderComponent(MainPage)}/>
                <Route path="/about" component={authHighOrderComponent(AboutPage)}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/signout" onEnter={signOut}/>
                <Route path="*" component={NotFoundPage}/>
            </Route>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);