import React from 'react'
import api from './api'
import username from './username'

export const withApi = ComposedComponent => class extends React.Component {
    constructor (props) {
        super(props)
        this.badResponseHandler = this.badResponseHandler.bind(this)
        this.goodResponseHandler = this.goodResponseHandler.bind(this)
    }

    render () {
        return <ComposedComponent
            {...this.props}
            get={this.get}
            post={this.post}
            goodResponseHandler={this.goodResponseHandler}
            badResponseHandler={this.badResponseHandler}
        />
    }

    get (url, data = null) {
        return api.get(url, data)
            .then(this.goodResponseHandler)
            .catch(this.badResponseHandler)
    }

    post (url, data = null) {
        return api.post(url, data)
            .then(this.goodResponseHandler)
            .catch(this.badResponseHandler)
    }

    goodResponseHandler (data) {
        username.prolongate()
        return data
    }

    badResponseHandler (response) {
        if (response.status === 401) {
            username.set(undefined)
            this.props.router.push({pathname: '/login', state: response})
        } else {
            return Promise.reject(response)
        }
    }
}

withApi.propTypes = {
    router: React.PropTypes.shape({
        push: React.PropTypes.func.isRequired
    }).isRequired
}

export default withApi