import authGuard from './authGuard'
import username from './username'

const testUsername = 'user@gmail.com'

describe('authGuard', () => {
    it('should do nothing if user is authenticated', () => {
        username.set(testUsername)
        let counter = 0
        authGuard({}, () => counter += 1)
        expect(counter).toBe(0)
    })

    it('should redirect anonymous user to login route', () => {
        username.set(undefined)
        let counter = 0
        authGuard({}, () => counter += 1)
        expect(counter).toBe(1)
    })
})