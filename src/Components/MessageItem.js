import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite'
import Paper from 'material-ui/Paper';
import {dateTimeFormat} from '../Utils/dateTimeFormat'


const Styles = StyleSheet.create({
    paper: {
        marginTop: '20px',
        // border: '1px solid #ccc'
    },
})

export default class MessageItem extends Component {
    render() {
        return (
            <Paper zDepth={1} className={css(Styles.paper)}>
                <div style={{padding: '10px 20px', background: 'rgba(219, 201, 243, 0.34902)'}}>
                    <span >{this.props.loginEMail}</span>
                    <span style={{float: 'right'}}>{ dateTimeFormat(this.props.addDate) }</span>
                </div>
                <div style={{padding: '20px'}}>{this.props.text}</div>
            </Paper>
        )
    }
}