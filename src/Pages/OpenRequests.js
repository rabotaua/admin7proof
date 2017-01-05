import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Link} from 'react-router'


export default class OpenRequests extends Component {

    constructor() {
        super();

        this.state = {
            filter: 1,
            stateIds: '0,1,2,3', //all open request
            list: null
        }
    }

    getListRequest(filter, stateIds) {
        getListApi(filter, stateIds).then(res => res.json()).then(data => this.setState({list: data}))
    }

    changeType(type = 1) {
        this.setState({filter: type, list: null})
        this.getListRequest(type, this.state.stateIds)
    }

    componentWillMount() {
        this.getListRequest(1, this.state.stateIds)
    }

    statusWord(id) {
        id = parseInt(id, 10); // eslint swears on the second argument :C   It's a radix argument O_O
        return id === 1 ? 'открыта' : id === 2 ? 'в работе' : id === 3 ? 'открыта повторно' : id === 4 ? 'закрыта' : ''
    }

    render() {

        const {list, filter} = this.state

        const linkStyle = {color: 'blue', marginTop: 50, marginLeft: 20}

        return (
            <div style={{marginLeft: 300}}>
                <br/><br/>
                <div>Открытые заявки</div>
                <br/><br/><br/>

                <a href="#employers" onClick={() => this.changeType(1)}
                   style={Object.assign({}, linkStyle, filter === 1 ? {color: 'red'} : '')}>Работодатели
                </a>

                <a href="#jobsearchers" onClick={() => this.changeType(2)}
                   style={Object.assign({}, linkStyle, filter === 2 ? {color: 'red'} : '')}>Соискатели
                </a>

                <br/>
                <br/>

                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>ID заявки</TableHeaderColumn>
                            <TableHeaderColumn>ID блокнота</TableHeaderColumn>
                            <TableHeaderColumn>Email</TableHeaderColumn>
                            <TableHeaderColumn>Тема</TableHeaderColumn>
                            <TableHeaderColumn>Подтема</TableHeaderColumn>
                            <TableHeaderColumn>Состояние</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                    { list
                        ? list[0].map(request => {
                            return (
                                <TableRow key={request.requestID}>
                                    <TableRowColumn><Link
                                        to={`/request/${request.requestID}`}>{request.requestID}</Link></TableRowColumn>
                                    <TableRowColumn>{request.notebookID}</TableRowColumn>
                                    <TableRowColumn>{request.eMail}</TableRowColumn>
                                    <TableRowColumn>{request.subjectName}</TableRowColumn>
                                    <TableRowColumn>{request.subSubjectName}</TableRowColumn>
                                    <TableRowColumn>{ this.statusWord(request.state) }</TableRowColumn>
                                </TableRow>
                            )
                        })
                        : <tr>
                            <td>LOADING...</td>
                        </tr> }
                    </TableBody>
                </Table>

            </div>
        );
    }
}