import React, {Component} from "react"
import Header from '../Components/Header'


export default class MainPage extends Component {
    render() {
        return (
            <main>
                <Header />
                {this.props.children}
            </main>
        )
    }
}