import {stringify} from 'qs'

const base = 'https://admin7.azurewebsites.net'

const wrapper = (url, opts = {}) => fetch(`${base}${url}`, {...opts, mode: 'cors', credentials: 'include'})
    .then(response => response.text().then(text => {
        let data

        try {
            data = JSON.parse(text)
        } catch (err) {
            data = text
        }

        response.data = data

        return response.ok ? data : Promise.reject(response)
    }))


export const get = (url, data = null) => wrapper(`${url}?${stringify(data)}`)

export const post = (url, data = null) => data
    ? wrapper(url, {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    : wrapper(url, {method: 'post'});

export default {get, post}