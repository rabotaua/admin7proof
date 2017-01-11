import React, {Component} from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import websocketEmitter from '../Utils/websocketEmitter'


export default class CreateNewRequest extends Component {

    constructor() {
        super();

        this.state = {
            modalShow: false
        }
    }


    modalShow(status = false) {
        this.setState({modalShow: status})
    }

    render() {
        const actions = [
            <FlatButton
                label="Отмена"
                primary={true}
                onTouchTap={() => this.modalShow.call(this, false)}
            />,
            <FlatButton
                label="Добавить"
                primary={true}
                onTouchTap={() => this.modalShow.call(this, false)}
            />,
        ];


        return (
            <div>

                <FloatingActionButton secondary={true}
                                      style={{position: 'fixed', zIndex: '100', bottom: '40px', right: '40px'}}>
                    <ContentAdd onClick={() => this.modalShow.call(this, true)}/>
                </FloatingActionButton>


                <Dialog
                    title="Добавить новую заявку"
                    actions={actions}
                    modal={false}
                    open={this.state.modalShow}
                    onRequestClose={() => this.modalShow.call(this, false)}
                >

                    {
                        websocketEmitter.getLatestEvents().map((message, index) => {
                            return <span key={index}>{message}</span>
                        })
                    }


                </Dialog>


            </div>
        )
    }
}