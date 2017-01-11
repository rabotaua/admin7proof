import React, {Component} from 'react'
import Dialog from 'material-ui/Dialog'
import OopsIcon from 'material-ui/svg-icons/social/sentiment-neutral'
import websocketEmitter from '../Utils/websocketEmitter'


export default class LatestEvents extends Component {
    render() {

        const latestEv = websocketEmitter.getLatestEvents()

        return (
            <Dialog title="Последние действия:" autoScrollBodyContent={true} open={this.props.open}
                    onRequestClose={this.props.openCloseCb}>
                <ul>
                    { latestEv && latestEv.length === 0

                        ? <div>
                            <h2 style={{color: '#888', textAlign: 'center'}}>
                                <OopsIcon style={{width: 50, height: 50}} color="#888"/>
                                <br/><br/>
                                Упс... но пока что ничего и не происходило
                            </h2>
                        </div>

                        : latestEv.slice(0).reverse().map((event, index) => {
                            return (
                                <li key={index} style={{listStyleType: 'none', fontSize: 18, padding: '5px 0'}}>
                                    <strong style={{color: '#000'}}>{ event.date }</strong> — { event.message }
                                </li>
                            )
                        })
                    }
                </ul>
            </Dialog>
        )
    }
}