import username from './username'

const authGuard = (nextState, replace) => {
    if (!username.get()) {
        replace('/login')
    }
}

export default authGuard