import React, {Component} from "react"
import validator from 'validator'
import {browserHistory} from 'react-router'


export default class LoginPage extends Component {

    constructor() {
        super()

        this.state = {
            validateError: '',
            emailVal: '',
            passVal: '',
            rememberMeVal: '',
        }
    }

    componentWillMount() {
        if (localStorage.getItem('auth')) {
            browserHistory['push']('/');
        }
    }

    login(e) {

        e.preventDefault();

        const {username, password, rememberMe} = this.refs;

        if (validator.isEmpty(username.value) || validator.isEmpty(password.value)) {
            this.setState({validateError: 'Empty fields!'})
            return false;
        }

        if (!validator.isEmail(username.value)) {
            this.setState({validateError: 'Not valid email!'})
            return false;
        }

        const fetchBody = JSON.stringify({
            username: username.value,
            password: password.value,
            remember: rememberMe.checked
        })

        fetch('https://admin7.azurewebsites.net/login', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: fetchBody
        })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('auth', true)
                    browserHistory['push']('/');
                }
                else {
                    this.setState({validateError: 'Not valid login or password!'})
                }
            })

    }

    render() {
        return (
            <form style={{margin: '100px 530px'}}>
                <p>Login</p>
                <input type="email" ref="username"/>
                <p>Password</p>
                <input type="password" ref="password"/>
                <p>Remember me</p>
                <input type="checkbox" ref="rememberMe"/>
                <br/><br/>
                <button onClick={this.login.bind(this)} type="submit">Send</button>

                <br /><br />

                { this.state.validateError ? <span style={{color: 'red'}}>{this.state.validateError}</span> : '' }
            </form>
        );
    }
}