import Cookies from 'js-cookie'
import moment from 'moment'

const cookieExpirationInMinutes = 30
export const cookieName = 'username'

const get = () => Cookies.get(cookieName)

const set = username => username
    ? Cookies.set(cookieName, username, {expires: moment().add(cookieExpirationInMinutes, 'minutes').toDate()})
    : Cookies.remove(cookieName)

const prolongate = () => set(get())

export default {get, set, prolongate}