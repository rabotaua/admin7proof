import React, {Component} from "react";
import {StyleSheet, css} from 'aphrodite'

const aboutStyles = StyleSheet.create({
    layout: {
        margin: '0 0 0 300px'
    }
})


export default class MainPage extends Component {
    render() {
        return (
            <div className={css(aboutStyles.layout)}>
                <br/><br/>
                MainPage
            </div>
        );
    }
}