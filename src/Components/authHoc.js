import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import {browserHistory} from 'react-router'


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
                fetch(`http://admin7.azurewebsites.net/username`, {mode: 'cors', credentials: 'include'})
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.length > 0) {
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
            return this.state.auth === true ? <WrappedComp /> : <CircularProgress style={{margin: '100px 50px'}}/>
        }
    }
}