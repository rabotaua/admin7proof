import React, {Component} from "react"
import Sidebar from '../Components/Sidebar'

export default class MainPage extends Component {
    render() {
        return (
            <main>
                <Sidebar />
                {this.props.children}
            </main>
        )
    }
}