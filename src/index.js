import React from "react"
import ReactDOM from "react-dom"
import {Router, Route, IndexRoute, browserHistory} from "react-router"
import Layout from "./Pages/Layout"
import MainPage from "./Pages/Main"
import AboutPage from "./Pages/About"
import LoginPage from "./Pages/Login"
import NotFoundPage from './Pages/404'
import OpenRequestsPage from './Pages/OpenRequests'
import RequestPage from './Pages/RequestPage'

// need for material-ui
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

//material-ui
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {indigo300} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme({
    palette: {
        textColor: 'rgba(0,0,0,0.87)',
        primary1Color: indigo300
    },
})


import authHighOrderComponent from './Components/authHoc'
import {signOutApi} from './Utils/fetchApi'


const signOut = () => {
    localStorage.removeItem('auth');
    signOutApi().then(() => browserHistory['replace']('/login'))
}


ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
        <Router history={browserHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={authHighOrderComponent(MainPage)}/>
                <Route path="/about" component={AboutPage}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/requests/open" component={authHighOrderComponent(OpenRequestsPage)}/>
                <Route path="/request/:requestId" component={authHighOrderComponent(RequestPage)}/>
                <Route path="/signout" onEnter={signOut}/>
                <Route path="*" component={NotFoundPage}/>
            </Route>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);