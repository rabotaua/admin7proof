import React from 'react'
import LoginForm from '../Components/LoginForm'
import username from '../Core/username'

class LoginPage extends React.Component {
    constructor (props) {
        super(props)
        this.login = this.login.bind(this)
    }

    login (data) {
        this.props.post('/login', data).then(() => {
            username.set(data.username)
            this.props.router.push('/')
        }).catch(err => {
            console.log('ERR', err)
        })
    }

    render () {
        return <div>
            <h1>LoginPage</h1>
            <LoginForm onSubmit={this.login}/>
        </div>
    }
}

export default LoginPage