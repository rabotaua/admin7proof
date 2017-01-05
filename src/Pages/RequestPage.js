import React, {Component} from "react"
import {getRequestDataApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Paper from 'material-ui/Paper';
import {StyleSheet, css} from 'aphrodite'

const Styles = StyleSheet.create({
    leftColomn: {
        width: '25%',
        marginRight: '30px',
        float: 'left'
    },
    rightColomn: {
        width: '70%',
        float: 'left'
    },
    paper: {
        width: '50%',
        marginTop: '20px',

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
                <h1 style={{color: 'rgb(124, 127, 148)', textTransform: 'uppercase'}}>Request -
                    #{this.context.router.params['requestId']}</h1>

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
                    <h2 style={{color: 'rgb(124, 127, 148)', textTransform: 'uppercase'}}>MESSAGES:</h2>


                    <div>{ requestData ? requestData[1].map(message => {
                            return (
                                <Paper zDepth={1} className={css(Styles.paper)}>
                                    <div style={{padding: '10px 20px', background: 'rgba(219, 201, 243, 0.34902)'}}>
                                        <span >{message.loginEMail}</span>
                                        <span style={{float: 'right'}}>{message.addDate}</span>
                                    </div>
                                    <div style={{padding: '20px'}}>{message.text}</div>
                                 </Paper>
                                    

                            )
                        }) : '' }
                    </div>


                </div>
            </div>
        )
    }
}

RequestPage.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default RequestPage