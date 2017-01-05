import React, {Component} from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import {Link} from 'react-router'
import {StyleSheet, css} from 'aphrodite'

const tableStyles = StyleSheet.create({
    link: {
        textDecoration: 'none',
        color: '#283593',
        fontWeight: 'bold'
    }
})


export default class RequestTableRow extends Component {

    statusWord(id) {
        id = parseInt(id, 10); // eslint swears on the second argument :C   It's a radix argument O_O
        return id === 1 ? 'открыта' : id === 2 ? 'в работе' : id === 3 ? 'открыта повторно' : id === 4 ? 'закрыта' : ''
    }

    render() {

        const {requestID, notebookID, eMail, subjectName, subSubjectName, state} = this.props;

        return (
            <TableRow>
                <TableRowColumn>
                    <Link className={css(tableStyles.link)} to={`/request/${requestID}`}>
                        {requestID}
                    </Link>
                </TableRowColumn>
                <TableRowColumn>{notebookID}</TableRowColumn>
                <TableRowColumn>{eMail}</TableRowColumn>
                <TableRowColumn>{subjectName}</TableRowColumn>
                <TableRowColumn>{subSubjectName}</TableRowColumn>
                <TableRowColumn>{ this.statusWord(state) }</TableRowColumn>
            </TableRow>
        )
    }
}