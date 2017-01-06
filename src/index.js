import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Layout from './Pages/Layout'
import AboutPage from './Pages/AboutPage'
import MainPage from './Pages/MainPage'
import LoginPage from './Pages/LoginPage'
import authGuard from './Core/authGuard'
import usernameInjector from './Core/usernameInjector'

injectTapEventPlugin()

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={browserHistory} createElement={usernameInjector}>
            <Route path="/" component={Layout}>
                <IndexRoute component={MainPage} onEnter={authGuard}/>
                <Route path="/about" component={AboutPage} onEnter={authGuard}/>
                <Route path="/login" component={LoginPage}/>
            </Route>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
)