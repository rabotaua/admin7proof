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
        return (
            <div>
                <Drawer docked={false} open={this.props.open} onRequestChange={this.props.openCloseCallback}>

                    <AppBar title="RUA - admin7" iconElementLeft={<IconButton><NavigationClose
                        onClick={this.props.openCloseCallback}/></IconButton>}/>

                    <MenuItem
                        containerElement={<Link to="/"/>}
                        primaryText="Main page"/>
                    <MenuItem
                        containerElement={<Link to="/about"/>}
                        primaryText="About"/>
                    <MenuItem
                        containerElement={<Link to="/404"/>}
                        primaryText="No page"/>

                    { localStorage.getItem('auth') ?
                        <MenuItem containerElement={<Link to="/requests/open"/>} primaryText="Open requests"/> : '' }

                    { localStorage.getItem('auth') ?
                        <MenuItem containerElement={<Link to="/signout"/>} primaryText="Sign out"/> : '' }

                </Drawer>
            </div>
        );
    }
}