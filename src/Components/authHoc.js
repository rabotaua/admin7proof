import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import {browserHistory} from 'react-router'
import {checkAuthApi} from '../Utils/fetchApi'


export default function authHighOrderComponent(WrappedComp) {
    return class authHoc extends Component {

        constructor() {
            super();

            this.state = {
                auth: null
            }
        }

        componentWillMount() {
            if (localStorage.getItem('auth')) {
                checkAuthApi().then(res => res.json())
                    .then(data => {
                        if (data.length > 0) {
                            localStorage.setItem('userName', data)
                            this.setState({auth: true})
                        }
                        else {
                            localStorage.removeItem('auth')
                            browserHistory['replace']('/login')
                        }
                    })
            }
            else {
                browserHistory['replace']('/login')
            }
        }

        render() {
            return this.state.auth === true ? <WrappedComp /> :
                <div style={{margin: '200px 0', textAlign: 'center'}}><CircularProgress size={120}/></div>
        }
    }
}