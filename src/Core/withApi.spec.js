import React from 'react'
import ReactDOM from 'react-dom'
import fetchMock from 'fetch-mock'
import {Router, Route, createMemoryHistory} from 'react-router'
import withApi from './withApi'
import username from './username'

const testUsername = 'user@gmail.com'

describe('withApi', () => {
    it('should inject api methods', done => {
        class TestComponent extends React.Component {
            render () {
                expect(typeof this.props.get).toBe('function')
                expect(typeof this.props.post).toBe('function')
                return null
            }
        }

        ReactDOM.render(<Router history={createMemoryHistory()}>
            <Route path="/" component={withApi(TestComponent)}/>
        </Router>, document.createElement('div'), done)

    })

    it('should prolongate username on success call', done => {
        fetchMock.get(/ping/, 'pong')

        class TestComponent extends React.Component {
            render () {
                let counter = 0
                username.set(testUsername)
                username.prolongate = () => counter += 1

                this.props.get('/ping').then(pong => {
                    expect(pong).toBe('pong')
                    expect(counter).toBe(1)
                    fetchMock.restore()
                    done()
                })
                return null
            }
        }

        ReactDOM.render(<Router history={createMemoryHistory()}>
            <Route path="/" component={withApi(TestComponent)}/>
        </Router>, document.createElement('div'))
    })

    it('should redirect unauthoried requests', done => {
        fetchMock.get(/ping/, 401)

        class TestComponentOne extends React.Component {
            render () {
                this.props.get('/ping')
                return null
            }
        }

        class TestComponentTwo extends React.Component {
            render () {
                expect(username.get()).toBe(undefined)
                done()
                return null
            }
        }

        ReactDOM.render(<Router history={createMemoryHistory()}>
            <Route path="/" component={withApi(TestComponentOne)}/>
            <Route path="/login" component={withApi(TestComponentTwo)}/>
        </Router>, document.createElement('div'))
    })
})