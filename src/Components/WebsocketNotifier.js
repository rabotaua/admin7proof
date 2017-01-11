import React, {Component} from 'react'
import Snackbar from 'material-ui/Snackbar'
import websocketEmitter from '../Utils/websocketEmitter'
import * as wsActions from '../Constants/wsActions'


export default class WebSocketNotifier extends Component {

    constructor() {
        super()
        this.state = {showSnack: false, messageSnack: ''}
    }

    showSnack(wsUsername) {
        const localStorageUserName = localStorage.getItem('userName')

        if (wsUsername !== localStorageUserName)
            this.setState({showSnack: true})
    }

    eventNotifiers() {
        window.addEventListener(wsActions.WS_TAKE_A_JOB, (message) => {
            this.showSnack(message.detail.responsibleLogin)
            const messageSnack = `Заявку #${message.detail.requestID} взял в работу ${message.detail.responsibleLogin}`
            this.setState({messageSnack})
            websocketEmitter.storeEvent(messageSnack)
        })

        window.addEventListener(wsActions.WS_NEW_MESSAGE, (message) => {
            this.showSnack(message.detail.responsibleLogin)
            const messageSnack = `Новое сообщение (заявка: #${message.detail.requestID}, автор: ${message.detail.responsibleLogin})`
            this.setState({messageSnack})
            websocketEmitter.storeEvent(messageSnack)
        })
    }

    componentWillMount() {
        websocketEmitter.connect()
        this.eventNotifiers()
    }

    handleRequestClose() {
        this.setState({showSnack: false, messageSnack: ''})
    }

    render() {
        return (
            <Snackbar
                open={this.state.showSnack}
                message={this.state.messageSnack}
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose.bind(this)}
            />
        )
    }
}