import React, {Component} from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import {Link} from 'react-router'
import {StyleSheet, css} from 'aphrodite'
import StatusWord from '../Components/StatusWord'

const tableStyles = StyleSheet.create({
    link: {
        textDecoration: 'none',
        color: '#283593',
        fontWeight: 'bold'
    }
})


export default class RequestTableRow extends Component {
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
                <TableRowColumn><StatusWord statusId={state}/></TableRowColumn>
            </TableRow>
        )
    }
}