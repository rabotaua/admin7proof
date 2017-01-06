import React from 'react'
import username from '../Core/username'

class MainPage extends React.Component {
    render () {
        return <div>
            <h1>MainPage</h1>
            <h4>{this.props.username}</h4>
            <button onClick={this.logout.bind(this)}>Logout</button>
        </div>
    }

    logout () {
        this.props.post('/logout').then(() => {
            username.set(undefined)
            this.props.router.push('/login')
        })
    }
}

export default MainPage