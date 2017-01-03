import React, {Component} from "react";
import {Link} from "react-router"
import FlatButton from 'material-ui/FlatButton';

export default class MainPage extends Component {
    render() {
        return (
            <main>
                <header>
                    <Link to="/">
                        <FlatButton label="MainPage"/>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/about">
                        <FlatButton label="AboutPage"/>
                    </Link>
                </header>

                { this.props.children}
            </main>
        );
    }
}