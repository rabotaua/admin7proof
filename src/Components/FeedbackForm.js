import React, {Component} from 'react'
import TextField from 'material-ui/TextField'


export default class FeedbackForm extends Component {
    render() {
        return (
            <div style={{width: '600px', margin: '30px 0'}}>
                <TextField
                    fullWidth={true}
                    hintText="Ваше сообщение..."
                    multiLine={true}
                    rows={1}
                />
            </div>
        )
    }
}