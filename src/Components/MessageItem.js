import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite'
import Paper from 'material-ui/Paper'
import DateTimeFormatter from './DateTimeFormatter'


const Styles = StyleSheet.create({
    paper: {
        marginTop: '20px',
        border: '1px solid #ccc'
    },
})

export default class MessageItem extends Component {
    render() {
        const {loginEMail} = this.props;

        return (
            <Paper zDepth={0} className={css(Styles.paper)}>
                <div style={{padding: '10px 20px', background: 'rgba(219, 201, 243, 0.34902)'}}>
                    <span>{ loginEMail ? loginEMail : <span>&nbsp;</span> } </span>
                    <span style={{float: 'right'}}>
                        <DateTimeFormatter dateTime={this.props.addDate} disableCheckExpire={true}/>
                    </span>
                </div>
                <div style={{padding: '20px', fontSize: '14px'}}>{this.props.text}</div>
            </Paper>
        )
    }
}