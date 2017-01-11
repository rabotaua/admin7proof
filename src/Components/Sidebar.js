import React, {Component} from "react"
import {Link} from "react-router"
import './Sidebar.css'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'


export default class Sidebar extends Component {

    render() {

        const {open, openCloseCallback} = this.props;

        return (
            <div>
                <Drawer docked={false} open={open} onRequestChange={openCloseCallback}>

                    <AppBar title="RUA - admin7" iconElementLeft={<IconButton><NavigationClose
                        onClick={openCloseCallback}/></IconButton>}/>

                    <MenuItem onTouchTap={openCloseCallback}
                              containerElement={<Link to="/"/>}
                              primaryText="Главная"/>

                    { localStorage.getItem('auth') ?
                        <MenuItem onTouchTap={openCloseCallback} containerElement={<Link to="/requests/open"/>}
                                  primaryText="Открытые заявки"/> : '' }

                    { localStorage.getItem('auth') ?
                        <MenuItem onTouchTap={openCloseCallback} containerElement={<Link to="/requests/done"/>}
                                  primaryText="Отработанные заявки"/> : '' }

                </Drawer>
            </div>
        );
    }
}