import React, {Component} from "react"
import Header from '../Components/Header'
import WebSocketNotifier from '../Components/WebsocketNotifier'


export default class MainPage extends Component {
    render() {
        return (
            <main>
                <Header />
                <WebSocketNotifier />
                {this.props.children}
            </main>
        )
    }
}