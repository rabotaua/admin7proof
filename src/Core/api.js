import {stringify} from 'qs'

const base = 'https://admin7.azurewebsites.net'

const wrapper = (url, opts = {}) => fetch(`${base}${url}`, {...opts, mode: 'cors', credentials: 'include'})
    .then(response => {
        return response.text().then(text => {
            try {
                return {data: JSON.parse(text), status: response.status}
            } catch (err) {
                return {data: text, status: response.status}
            }
        })
    })


export const get = (url, data = null) => wrapper(`${url}?${stringify(data)}`)

export const post = (url, data = null) => data
    ? wrapper(url, {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    : wrapper(url, {method: 'post'});

export default {get, post}