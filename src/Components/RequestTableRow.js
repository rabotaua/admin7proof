import React, {Component} from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import RaisedButton from 'material-ui/RaisedButton'
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

    takeJobCheck() {
        let {responsibleLogin, state} = this.props;

        if (state === 1 || state === 3) {
            if (localStorage.getItem('userName') !== responsibleLogin) {
                return true
            }
        }

        return false
    }

    render() {
        let {requestID, notebookID, eMail, subjectName, subSubjectName, state, responsibleLogin, date} = this.props;

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
                <TableRowColumn><strong>{responsibleLogin}</strong></TableRowColumn>
                <TableRowColumn>{date}</TableRowColumn>
                <TableRowColumn>
                    { this.takeJobCheck() ? <RaisedButton primary={true} label="Взять в работу"/> : '' }
                </TableRowColumn>
            </TableRow>
        )
    }
}