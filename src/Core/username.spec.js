import Cookies from 'js-cookie'
import username, {cookieName} from './username'

const testUsername = 'user@gmail.com'

describe('usernameCookie', () => {
    it('should return username if any', () => {
        Cookies.set(cookieName, testUsername)
        expect(username.get()).toBe(testUsername)
    })

    it('should return undefined for anon', () => {
        Cookies.remove(cookieName)
        expect(username.get()).toBe(undefined)
    })

    it('should set cookie', () => {
        Cookies.remove(cookieName)
        username.set(testUsername)
        expect(Cookies.get(cookieName)).toBe(testUsername)
    })

    it('should not prolongate empty cookie', () => {
        Cookies.remove(cookieName)
        username.prolongate()
        expect(Cookies.get(cookieName)).toBe(undefined)
    })

    it('should prolongate cookie', () => {
        username.set(testUsername)
        username.prolongate()
        expect(Cookies.get(cookieName)).toBe(testUsername)
    })
})