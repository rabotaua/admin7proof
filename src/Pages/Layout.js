import React, {Component} from "react"
import {Link} from "react-router"
import Sidebar from './Sidebar'

export default class MainPage extends Component {
    render() {

        return (
            <main>
               
                <Sidebar />

                {this.props.children}
            </main>
        );
    }
}