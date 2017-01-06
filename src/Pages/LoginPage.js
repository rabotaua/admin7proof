import React from 'react'
import LoginForm from '../Components/LoginForm'
import username from '../Core/username'

class LoginPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isSubmitting: false,
            error: undefined
        }

        this.login = this.login.bind(this)
    }

    login (data) {
        this.setState({isSubmitting: true})

        this.props.post('/login', data).then(() => {
            username.set(data.username)
            this.props.router.push('/')
        }).catch(error => {
            this.setState({isSubmitting: false, error: error.data})
        })
    }

    render () {
        return <div>
            <h1>LoginPage</h1>
            <LoginForm
                onSubmit={this.login}
                isSubmitting={this.state.isSubmitting}
                error={this.state.error}/>
        </div>
    }
}

export default LoginPage