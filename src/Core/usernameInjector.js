import React from 'react'
import username from './username'

const usernameInjector = (Component, props) => {
    return <Component {...props} username={username.get()}/>
}

export default usernameInjector