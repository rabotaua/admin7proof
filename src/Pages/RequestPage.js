import React, {Component} from "react"
import {getRequestDataApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Paper from 'material-ui/Paper';
import {StyleSheet, css} from 'aphrodite'

const Styles = StyleSheet.create({
    leftColomn: {
        width: '25%',
        'margin-right': '30px',
        float: 'left'
    },
    rightColomn: {
        width: '70%',
        float: 'left'
    }
})

class RequestPage extends Component {

    constructor() {
        super()

        this.state = {
            requestData: null
        }
    }

    getRequestData(requestId) {
        getRequestDataApi(requestId).then(res => res.json()).then(data => {
            this.setState({requestData: data})
        })
    }

    componentWillMount() {
        this.getRequestData(this.context.router.params['requestId'])
    }

    statusWord(id) {
        id = parseInt(id, 10); // eslint swears on the second argument :C   It's a radix argument O_O
        return id === 1 ? 'открыта' : id === 2 ? 'в работе' : id === 3 ? 'открыта повторно' : id === 4 ? 'закрыта' : ''
    }

    render() {
        const {requestData} = this.state;

        return (
            <div style={{padding: '0 20px 20px'}}>
                <h1 style={{color: '#3F51B5', 'text-transform' : 'uppercase'}}>Request - #{this.context.router.params['requestId']}</h1>

                <div>
                    { requestData

                        ? requestData[0].map(request => {
                            return <div key={request.requestID}>
                                <div className={css(Styles.leftColomn)}>
                                    <Table className="requestTable">
                                        <TableBody displayRowCheckbox={false} >
                                            <TableRow>
                                                <TableHeaderColumn>Имя:</TableHeaderColumn>
                                                <TableRowColumn>{request.contactPerson}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Email:</TableHeaderColumn>
                                                <TableRowColumn>{request.eMail}</TableRowColumn>
                                            </TableRow>
                                             <TableRow>
                                                <TableHeaderColumn>Статус:</TableHeaderColumn>
                                                <TableRowColumn>{ this.statusWord(request.state) }</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Тема:</TableHeaderColumn>
                                                <TableRowColumn>{request.subjectName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Подтема:</TableHeaderColumn>
                                                <TableRowColumn>{request.subSubjectName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Дата:</TableHeaderColumn>
                                                <TableRowColumn>{request.date}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Отвественный:</TableHeaderColumn>
                                                <TableRowColumn>{request.responsibleLogin}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className={css(Styles.rightColomn)}>
                                    <Table className="requestTable">
                                        <TableBody displayRowCheckbox={false}>
                                             <TableRow>
                                                <TableHeaderColumn>Название компании:</TableHeaderColumn>
                                                <TableRowColumn>{request.companyName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>UserScale:</TableHeaderColumn>
                                                <TableRowColumn>{request.userScale}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>UserAgent:</TableHeaderColumn>
                                                <TableRowColumn>{request.userAgent}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>isCookiesTurnOn:</TableHeaderColumn>
                                                <TableRowColumn>{request.isCookiesTurnOn}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>PageURL:</TableHeaderColumn>
                                                <TableRowColumn>{request.pageURL}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>IP:</TableHeaderColumn>
                                                <TableRowColumn>{request.ipAddress}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div style={{clear: 'both'}}></div>
                                <div className={css(Styles.leftColomn)}>
                                    <Table className="requestTable">
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow style={{'background-color': 'rgba(219, 201, 243, 0.34902)'}}>
                                                <TableHeaderColumn >Username:</TableHeaderColumn>
                                                <TableHeaderColumn>Телефон:</TableHeaderColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableRowColumn>{request.userName}</TableRowColumn>
                                                <TableRowColumn>{request.contactPhone}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div style={{clear: 'both'}}></div>
                            </div>
                        })

                        : 'LOADING...'

                    }

                    <br/>
                    <h2 style={{color: '#3F51B5', 'text-transform' : 'uppercase'}}>MESSAGES:</h2>

                    
                        <div>{ requestData ? requestData[1].map(message => {
                                return (
                                        <Paper zDepth={1}>
                                        <div>{message.loginEMail}</div>
                                        <span style={{float: 'left'}}>{message.addDate}</span>
                             
                                        <div>{message.text}</div>
                                         </Paper>
                                )
                            }) : '' }
                        </div>
                   

                    <table style={{border: '1px solid #ccc'}}>
                        { requestData ? requestData[1].map(message => {
                                return (
                                    <tbody>
                                    <tr>
                                        <th>
                                            {message.loginEMail}
                                            <span style={{float: 'left'}}>{message.addDate}</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td>{message.text}</td>
                                    </tr>
                                    </tbody>
                                )
                            }) : '' }
                    </table>

                </div>
            </div>
        )
    }
}

RequestPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default RequestPage