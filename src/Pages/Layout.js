import React, {Component} from "react";
import {Link} from "react-router"
import FlatButton from 'material-ui/FlatButton';

import {StyleSheet, css} from 'aphrodite';


const headerStyles = StyleSheet.create({
    testMarginRight: {
        marginRight: '0px'
    }
});


export default class MainPage extends Component {
    render() {
        return (
            <main>
                <header>
                    <Link to="/">
                        <FlatButton className={css(headerStyles.testMarginRight)} label="MainPage"/>
                    </Link>

                    <Link to="/about">
                        <FlatButton label="AboutPage"/>
                    </Link>
                </header>

                { this.props.children}
            </main>
        );
    }
}