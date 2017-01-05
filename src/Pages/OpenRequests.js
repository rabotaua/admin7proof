import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Link} from 'react-router'
import {StyleSheet, css} from 'aphrodite'

const tableStyles = StyleSheet.create({
    link: {
        'text-decoration': 'none',
        color: '#00695C',
        'font-weight': 'bold'
    },
    th: {
        color: '#00695C',
        'font-weight': 'bold'
    }
})

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

        const linkStyle = {color: '#26A69A', marginTop: 50, marginRight: 20, 'text-decoration': 'none'}

        return (
            <div>
                
                <h1 style={{color: '#00695C', padding: '0 0 0 20px', 'text-transform' : 'uppercase'}}>Открытые заявки</h1>

                <div style={{'background-color' : '#E0F2F1', padding: '20px'}}>
                    <a href="#employers" onClick={() => this.changeType(1)}
                       style={Object.assign({}, linkStyle, filter === 1 ? {color: '#BF360C'} : '')}>Работодатели
                    </a>

                    <a href="#jobsearchers" onClick={() => this.changeType(2)}
                       style={Object.assign({}, linkStyle, filter === 2 ? {color: '#BF360C'} : '')}>Соискатели
                    </a>
                </div>
                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn className={css(tableStyles.th)}>ID заявки</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>ID блокнота</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Email</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Тема</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Подтема</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Состояние</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                    { list
                        ? list[0].map(request => {
                            return (
                                <TableRow key={request.requestID}>
                                    <TableRowColumn><Link className={css(tableStyles.link)}
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
                            <td style={{padding: '20px'}}>LOADING...</td>
                        </tr> }
                    </TableBody>
                </Table>

            </div>
        );
    }
}