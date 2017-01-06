import React, {Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {browserHistory} from 'react-router'
import {setResponsibleApi, setStateApi} from '../Utils/fetchApi'


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

        // start round spinner
        this.setState({pendingRequest: true})

        const requestID = this.props.requestID
        const responsibleLogin = localStorage.getItem('username') + 'aaaa'

        setResponsibleApi(requestID, responsibleLogin).then(res => {
            if (res.status === 200) {
                setStateApi(requestID, 2).then(res => {
                    if (res.status === 200) {
                        browserHistory['push'](`/request/${this.props.requestID}`)
                    }
                })
            }
        }).then(() => this.setState({pendingRequest: false})) //spinner off

    }

    render() {
        return (
            <span>
                { this.takeJobCheckShow() ?
                    <RaisedButton disabled={this.state.pendingRequest} onClick={this.takeJobAction.bind(this)}
                                  primary={true} label="Взять в работу"/> : '' }
            </span>
        )
    }
}