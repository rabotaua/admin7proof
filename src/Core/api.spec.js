import api from './api'
import fetchMock from 'fetch-mock'

describe('api', () => {
    afterEach(() => fetchMock.restore())

    it('should append cors and credentials', done => {
        fetchMock.get('*', 200)

        api.get('/ping').then(() => {
            const {mode, credentials} = fetchMock.lastOptions()

            expect(mode).toBe('cors')
            expect(credentials).toBe('include')

            done()
        })
    })

    it('should understand json responses', done => {
        fetchMock.get('*', {foo: 'bar'})

        api.get('/ping').then(({foo}) => {
            expect(foo).toBe('bar')
            done()
        })
    })

    it('should understand text responses', done => {
        fetchMock.get('*', 'hello')

        api.get('/ping').then(response => {
            expect(response).toBe('hello')
            done()
        })
    })

    it('should pass query string', done => {
        fetchMock.get(/ping/, 'hello')

        api.get('/ping', {foo: 'bar', acme: 42}).then(() => {
            const [url] = fetchMock.lastCall()

            expect(url.match(/foo=bar&acme=42/) != null).toBe(true)
            done()
        })
    })

    it('should have post method', done => {
        fetchMock.post('*', 200)

        api.post('/ping').then(() => {
            const {method} = fetchMock.lastOptions()
            expect(method).toBe('post')
            done()
        })
    })

    it('should post json', done => {
        fetchMock.post('*', 200)

        api.post('/ping', {foo: 'bar'}).then(() => {
            const {method, headers, body} = fetchMock.lastOptions()
            expect(method).toBe('post')
            expect(headers['Content-Type']).toBe('application/json')
            expect(JSON.parse(body).foo).toBe('bar')
            done()
        })
    })

    it('should throw an error on bad responses', done => {
        fetchMock.get('*', {status: 400, body: JSON.stringify({error: 'wrong'})})

        api.get('/ping').catch(({status, data}) => {
            expect(status).toBe(400)
            expect(data.error).toBe('wrong')
            done()
        })
    })
})