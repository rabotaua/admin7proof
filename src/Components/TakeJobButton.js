import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {setResponsibleApi, setStateApi} from '../Utils/fetchApi'
import websocketEmitter from '../Utils/websocketEmitter'
import {WS_TAKE_A_JOB} from '../Constants/wsActions'


export default class TakeJobButton extends Component {

    constructor() {
        super();

        this.state = {
            pendingRequest: false
        }
    }

    takeJobCheckShow() {
        let {responsibleLogin, state} = this.props;

        if (state === 1 || state === 3) {
            if (localStorage.getItem('userName') !== responsibleLogin) {
                return true
            }
        }
    }

    takeJobAction() {

        // disable submit button
        this.setState({pendingRequest: true})

        const requestID = this.props.requestID
        const responsibleLogin = localStorage.getItem('username')

        setResponsibleApi(requestID, responsibleLogin).then(res => {
            if (res.status === 200) {
                setStateApi(requestID, 2).then(res => {
                    if (res.status === 200) {
                        websocketEmitter.emit(WS_TAKE_A_JOB, {requestID, responsibleLogin})
                        this.props.successfulCallback()
                    }
                })
            }
        }).then(() => this.setState({pendingRequest: false})) //enable submit button

    }

    render() {
        return (
            <span>
                { this.takeJobCheckShow() ?
                    <RaisedButton disabled={this.state.pendingRequest} onClick={this.takeJobAction.bind(this)}
                                  primary={true} label="Взять в работу"/>
                    : this.props.children ? this.props.children : '' }
            </span>
        )
    }
}