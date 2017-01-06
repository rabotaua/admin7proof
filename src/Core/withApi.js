import React from 'react'
import api from './api'
import username from './username'

export const withApi = ComposedComponent => class extends React.Component {
    constructor (props) {
        super(props)
        this.responseHandler = this.responseHandler.bind(this)
    }

    render () {
        return <ComposedComponent
            {...this.props}
            get={this.get}
            post={this.post}
            responseHandler={this.responseHandler}
        />
    }

    get (url, data = null) {
        return api.get(url, data).then(this.responseHandler)
    }

    post (url, data = null) {
        return api.post(url, data).then(this.responseHandler)
    }

    responseHandler (response) {
        if (response.status === 401) {
            username.set(undefined)
            this.props.router.push({pathname: '/login', state: response})
        } else {
            username.prolongate()
        }

        return response.data
    }
}

withApi.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
}

export default withApi