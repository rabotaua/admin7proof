import React, {Component} from "react"
import {Link} from "react-router"
import './Sidebar.css'


import Drawer from 'material-ui/Drawer'
// import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {

        return (
            <div>
                <Drawer open={this.state.open}>
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
                        <MenuItem containerElement={<Link to="/requests/open"/>} primaryText="Open requests"/> : "" }

                    { localStorage.getItem('auth') ?
                        <MenuItem containerElement={<Link to="/signout"/>} primaryText="Sign out"/> : "" }

                </Drawer>
            </div>
        );
    }
}