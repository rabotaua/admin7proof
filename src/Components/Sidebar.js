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
                              primaryText="Main page"/>
                    <MenuItem onTouchTap={openCloseCallback}
                              containerElement={<Link to="/about"/>}
                              primaryText="About"/>
                    <MenuItem onTouchTap={openCloseCallback}
                              containerElement={<Link to="/404"/>}
                              primaryText="No page"/>

                    { localStorage.getItem('auth') ?
                        <MenuItem onTouchTap={openCloseCallback} containerElement={<Link to="/requests/open"/>}
                                  primaryText="Open requests"/> : '' }

                    { localStorage.getItem('auth') ?
                        <MenuItem onTouchTap={openCloseCallback} containerElement={<Link to="/signout"/>}
                                  primaryText="Sign out"/> : '' }

                </Drawer>
            </div>
        );
    }
}