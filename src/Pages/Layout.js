import React, {Component} from "react"
import {Link} from "react-router"

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

import {StyleSheet, css} from 'aphrodite'


const headerStyles = StyleSheet.create({
    headerNavBtn: {
        color: '#fff',
        marginTop: '6px'
    }
})


export default class MainPage extends Component {
    render() {

        const HeaderNavBtn = (props) => {
            return <Link to={props.link}>
                <FlatButton className={css(headerStyles.headerNavBtn)} label={props.name}/>
            </Link>
        }

        return (
            <main>
                <header>
                    <AppBar
                        title="Admin7 - rabota.ua"
                        showMenuIconButton={false}
                        iconElementRight={
                            <div>
                                <HeaderNavBtn name="Main page" link="/"/>
                                <HeaderNavBtn name="About page" link="/about"/>
                                <HeaderNavBtn name="Another page" link="/404"/>
                                { localStorage.getItem('auth') ? <HeaderNavBtn name="Sign out" link="/signout"/> : '' }
                            </div>
                        }
                    />
                </header>

                {this.props.children}
            </main>
        );
    }
}