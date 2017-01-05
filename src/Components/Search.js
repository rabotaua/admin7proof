import React, {Component} from 'react'
import validator from 'validator'


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
            <form action="#search">
                <input placeholder="requestId" type="text" name="requestId" ref="requestId"/>
                <input placeholder="notebookId" type="text" name="notebookId" ref="notebookId"/>
                <input placeholder="eMail of notebook" type="text" name="eMail" ref="eMail"/>

                <button onClick={this.findItems.bind(this)} type="submit">Find</button>
                <button onClick={this.props.resetCallback} type="reset">Reset</button>
            </form>
        )
    }
}