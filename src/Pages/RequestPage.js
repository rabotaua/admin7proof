import React, {Component} from "react"
import {getRequestDataApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper';
import {StyleSheet, css} from 'aphrodite'
import StatusWord from '../Components/StatusWord'

const Styles = StyleSheet.create({
    leftColomn: {
        width: '40%',
        float: 'left'
    },
    leftColomnPersonalInfo: {
        width: '55%'
    },
    rightColomn: {
        width: '55%',
        float: 'right'
    },
    paper: {
        marginTop: '20px',

    },
    container: {
        maxWidth: '1260px',
        margin: '0 auto',
        width: '100%',
        padding: '0 20px 20px'

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

    render() {
        const {requestData} = this.state;
        const personInfoTableHStyle = {
            'color': '#EC407A',
            fontWeight: 'bold',
            width: '150px',
            borderRight: '1px solid rgb(224, 224, 224)'
        }

        return (
            <div className={css(Styles.container)}>
                <h1>Заявка #{this.context.router.params['requestId']}
                </h1>

                <div>
                    { requestData

                        ? requestData[0].map(request => {
                            return <div key={request.requestID}>
                                <div className={css(Styles.leftColomn)}>
                                    <Table className="requestTable" selectable={false}>
                                        <TableBody displayRowCheckbox={false} >
                                            <TableRow>
                                                <TableHeaderColumn>Дата заявки:</TableHeaderColumn>
                                                <TableRowColumn>{request.date}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>ID блокнота:</TableHeaderColumn>
                                                <TableRowColumn>{request.notebookID}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>E-Mail:</TableHeaderColumn>
                                                <TableRowColumn><a href={`mailto:${request.eMail}`}>{request.eMail}</a></TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Статус:</TableHeaderColumn>
                                                <TableRowColumn><StatusWord statusId={request.state}/></TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Оценка:</TableHeaderColumn>
                                                <TableRowColumn>{request.userScale}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className={css(Styles.rightColomn)}>
                                    <Table className="requestTable" selectable={false}>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn>UserAgent:</TableHeaderColumn>
                                                <TableRowColumn>{request.userAgent}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Cookies:</TableHeaderColumn>
                                                <TableRowColumn>{request.isCookiesTurnOn ? 'включены' : 'отключены' }</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>URL:</TableHeaderColumn>
                                                <TableRowColumn><a target="_blank"
                                                                   href={`http://rabota.ua${request.pageURL}`}>{request.pageURL}</a></TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>IP:</TableHeaderColumn>
                                                <TableRowColumn>{request.ipAddress}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn>Ответственный:</TableHeaderColumn>
                                                <TableRowColumn><strong>{request.responsibleLogin}</strong></TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div style={{clear: 'both'}}></div>
                                <hr />
                                <div className={css([Styles.leftColomn, Styles.leftColomnPersonalInfo])}>
                                    <Table selectable={false}>
                                        <TableBody displayRowCheckbox={false}>
                                            <TableRow>
                                                <TableHeaderColumn style={personInfoTableHStyle}>Название
                                                    компании:</TableHeaderColumn>
                                                <TableRowColumn>{request.companyName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow >
                                                <TableHeaderColumn style={personInfoTableHStyle}>Контактное
                                                    лицо:</TableHeaderColumn>
                                                <TableRowColumn>{request.contactPerson}</TableRowColumn>
                                            </TableRow>
                                            <TableRow >
                                                <TableHeaderColumn
                                                    style={personInfoTableHStyle}>Должность:</TableHeaderColumn>
                                                <TableRowColumn>{request.employerPostName}</TableRowColumn>
                                            </TableRow>
                                            <TableRow>
                                                <TableHeaderColumn
                                                    style={personInfoTableHStyle}>Телефон:</TableHeaderColumn>
                                                <TableRowColumn>{request.contactPhone}</TableRowColumn>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div style={{clear: 'both'}}></div>
                            </div>
                        })

                        : <CircularProgress size={80}/>

                    }

                    <br/> <br/>

                    { requestData ? <h2>Сообщения</h2> : '' }

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