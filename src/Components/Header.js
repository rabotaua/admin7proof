import React, {Component} from "react"
import {Link, browserHistory} from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import Sidebar from './Sidebar'
import FlatButton from 'material-ui/FlatButton'

export default class Header extends Component {

    constructor() {
        super();

        this.state = {
            sidebarOpen: false
        }
    }

    openCloseSidebar() {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    }

    render() {

        const Logged = () => (
            <IconMenu iconStyle={{color: '#fff'}}
                      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Статистика"/>

                { localStorage.getItem('auth') ?
                    <MenuItem primaryText="Выйти" containerElement={<Link to="/signout"/>}/> : '' }

            </IconMenu>
        )

        return <div>
            <AppBar
                onLeftIconButtonTouchTap={this.openCloseSidebar.bind(this)}
                iconElementRight={ localStorage.getItem('auth') ? <Logged /> :
                    <FlatButton label="Войти" onClick={() => browserHistory['push']('/login')}/>}
                title="RUA - admin7"
            />

            <Sidebar open={this.state.sidebarOpen} openCloseCallback={this.openCloseSidebar.bind(this)}/>
        </div>

    }
}