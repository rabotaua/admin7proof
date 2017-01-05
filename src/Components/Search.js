import React, {Component} from 'react'
import validator from 'validator'
import RaisedButton from 'material-ui/RaisedButton';
import {StyleSheet, css} from 'aphrodite'

const searchFormStyles = StyleSheet.create({
    layout: {
        float: 'right',
        margin: '20px'

    },
    input: {
        marginLeft: '10px',
        padding: '10px',
        display: 'inline-block',
        borderRadius: '2px',
        border: '1px solid rgba(49, 21, 84, 0.21)',
        position: 'relative',
        top: '-1px'
    },
    btn: {
        marginLeft: '10px'
    }

})

export default class Search extends Component {

    findItems(e) {
        e.preventDefault();

        const {requestId, notebookId, eMail} = this.refs;

        if (validator.isEmpty(requestId.value) && validator.isEmpty(notebookId.value) && validator.isEmpty(eMail.value))
            return false

        this.props.searchCallback({
            requestId: requestId.value,
            notebookId: notebookId.value,
            eMail: eMail.value
        })
    }

    render() {
        return (
            <div className={css(searchFormStyles.layout)}>
                <form action="#search">
                    <input className={css(searchFormStyles.input)} placeholder="ID заявки" type="text" name="requestId"
                           ref="requestId"/>
                    <input className={css(searchFormStyles.input)} placeholder="ID блокнота" type="text"
                           name="notebookId" ref="notebookId"/>
                    <input className={css(searchFormStyles.input)} placeholder="E-Mail блокнота" type="text"
                           name="eMail" ref="eMail"/>
                    <RaisedButton className={css(searchFormStyles.btn)} primary={true}
                                  onClick={this.findItems.bind(this)} type="submit" label="Искать"/>
                    <RaisedButton className={css(searchFormStyles.btn)} secondary={true}
                                  onClick={this.props.resetCallback} type="reset" label="Очистить"/>
                </form>
            </div>
        )
    }
}