import React, {Component} from 'react'
import {TableRow, TableRowColumn} from 'material-ui/Table'
import {Link} from 'react-router'
import {StyleSheet, css} from 'aphrodite'
import StatusWord from '../Components/StatusWord'
import {dateTimeFormat} from '../Utils/dateTimeFormat'
import TakeJobButton from '../Components/TakeJobButton'
import {browserHistory} from 'react-router'


const tableStyles = StyleSheet.create({
    link: {
        textDecoration: 'none',
        color: '#283593',
        fontWeight: 'bold'
    }
})


export default class RequestTableRow extends Component {

    checkOwnTickets() {
        if (this.props.state !== 4 && this.props.responsibleLogin === localStorage.getItem('userName'))
            return {backgroundColor: 'rgba(197,202,233,0.1)'}
        else
            return {}
    }

    render() {
        let {requestID, notebookID, eMail, subjectName, subSubjectName, state, responsibleLogin, date} = this.props;

        return (
            <TableRow style={ this.checkOwnTickets() }>
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
                <TableRowColumn>{ dateTimeFormat(date) }</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>
                    <TakeJobButton
                        requestID={requestID}
                        responsibleLogin={responsibleLogin}
                        state={state}
                        successfulCallback={ () => browserHistory['push'](`/request/${requestID}`) }
                    />
                </TableRowColumn>
            </TableRow>
        )
    }
}