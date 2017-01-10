import React, {Component} from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {sendMessageApi} from '../Utils/fetchApi'



export default class FeedbackForm extends Component {

    constructor() {
        super();

        this.state = {
            messageText: '',
            validationErr: ''
        }
    }


    // hotkey - send message [Ctrl+Enter]
    keydownHandler(e) {
        if (e.keyCode === 13 && e.ctrlKey) {
            this.sendMessage(e)
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler.bind(this));
    }

    sendMessage(e) {
        e.preventDefault()

        let {messageTextRef} = this.refs
        const {requestID, responsibleLogin, sentCallback} = this.props
        const messageTextVal = messageTextRef.input.refs.input.value

        if (messageTextVal.length === 0) {
            this.setState({validationErr: ' '})
            return
        }

        this.setState({validationErr: ''})
        sendMessageApi(requestID, messageTextVal, responsibleLogin).then(res => {
            sentCallback() //refresh ticket data (including messages)
            this.setState({messageText: ""})
        })
    }

    render() {
        return (
            <div style={{width: '100%', margin: '30px 0'}}>
                <form action="#sendmessage" onSubmit={this.sendMessage.bind(this)}>
                    <TextField
                        style={{width: '550px', margin: '0 30px 0 0'}}
                        hintText="Ответить..."
                        multiLine={true}
                        rows={1}
                        ref="messageTextRef"
                        errorText={this.state.validationErr}
                        value={this.state.messageText}
                        onChange={ (e) => this.setState({messageText: e.target.value}) }
                    />
                    <RaisedButton type="submit" label="Отправить" primary={true}/>
                </form>
            </div>
        )
    }
}