import React, {Component} from "react"
import validator from 'validator'
import {browserHistory} from 'react-router'
import {loginApi} from '../Utils/fetchApi'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'


export default class LoginPage extends Component {

    constructor() {
        super()

        this.state = {
            emailVal: '',
            passVal: '',
            validateEmailErr: '',
            validatePassErr: '',
            authError: ''
        }
    }

    componentWillMount() {
        if (localStorage.getItem('auth')) {
            browserHistory['push']('/');
        }
    }

    login(e) {

        e.preventDefault();

        const {username, password} = this.refs;

        if (validator.isEmpty(username.input.value)) {
            this.setState({validateEmailErr: 'Заполните поле'})
            return false;
        } else {
            this.setState({validateEmailErr: ''})
        }

        if (!validator.isEmail(username.input.value)) {
            this.setState({validateEmailErr: 'E-Mail неверный!'})
            return false;
        }

        if (validator.isEmpty(password.input.value)) {
            this.setState({validatePassErr: 'Заполните поле'})
            return false;
        } else {
            this.setState({validatePassErr: ''})
        }

        const fetchBody = JSON.stringify({
            username: username.input.value,
            password: password.input.value
        })

        loginApi(fetchBody)
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('auth', true)
                    browserHistory['push']('/');
                }
                else {
                    this.setState({authError: 'Логин или пароль неправильные'})
                }
            })
    }

    render() {

        const {validateEmailErr, validatePassErr} = this.state;

        const inputStyle = {width: '100%', display: 'block'}
        return (
            <form action="#signin" style={{margin: '100px auto', width: '500px'}}>

                <Paper zDepth={1} style={{padding: '10px 30px'}}>
                    <TextField
                        style={inputStyle}
                        floatingLabelText="Логин:"
                        type="email" name="email" ref="username"
                        errorText={ validateEmailErr ? validateEmailErr : '' }
                    />
                    <TextField
                        style={inputStyle}
                        floatingLabelText="Пароль:"
                        type="password" name="password" ref="password"
                        errorText={ validatePassErr ? validatePassErr : '' }
                    />

                    <div style={{paddingTop: 20, textAlign: 'center'}}>
                        <FlatButton primary={true} type="submit" onClick={this.login.bind(this)}>ВОЙТИ</FlatButton>
                    </div>

                    <br />

                    { this.state.authError ? <span style={{color: 'red'}}>{this.state.authError}</span> : '' }

                </Paper>

            </form>
        );
    }
}