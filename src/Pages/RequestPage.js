import React, {Component} from "react"
import {getRequestDataApi} from '../Utils/fetchApi'


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
            <div style={{marginLeft: 300}}>
                <br/><br/>
                <h1>Request - #{this.context.router.params['requestId']}</h1>

                <div>
                    { requestData

                        ? requestData[0].map(request => {
                            return <div key={request.requestID}>
                                <p><b>Имя:</b> {request.contactPerson}</p>
                                <p><b>Телефон:</b> {request.contactPhone}</p>
                                <p><b>Username:</b> {request.userName}</p>
                                <p><b>Статус:</b> { this.statusWord(request.state) }</p>
                                <p><b>Email:</b> {request.eMail}</p>
                                <p><b>Тема:</b> {request.subjectName}</p>
                                <p><b>Подтема:</b> {request.subSubjectName}</p>
                                <p><b>Дата:</b> {request.date}</p>
                                <p><b>Отвественный:</b> {request.responsibleLogin}</p>
                                <p><b>Название компании:</b> {request.companyName}</p>
                                <p><b>UserScale:</b> {request.userScale}</p>
                                <p><b>UserAgent:</b> {request.userAgent}</p>
                                <p><b>isCookiesTurnOn:</b> {request.isCookiesTurnOn}</p>
                                <p><b>PageURL:</b> {request.pageURL}</p>
                                <p><b>IP:</b> {request.ipAddress}</p>
                            </div>
                        })

                        : 'LOADING...'

                    }

                    <br/><br/><br/><br/>
                    <h2>MESSAGES:</h2>


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