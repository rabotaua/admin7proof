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

        const userNameStyle = {
            color: '#fff',
            fontSize: '19px',
            position: 'relative',
            top: '-5px',
            marginRight: '5px'
        }

        const Logged = () => (
            <div>
                { localStorage.getItem('auth') ?
                    <span style={userNameStyle }>{localStorage.getItem('userName')}</span> : '' }

                <IconMenu
                    iconStyle={{color: '#fff'}}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >

                    <MenuItem primaryText="Статистика" containerElement={<Link to="/"/>}/>

                    { localStorage.getItem('auth') ?
                        <MenuItem primaryText="Выйти" containerElement={<Link to="/signout"/>}/> : '' }

                </IconMenu>
            </div>
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