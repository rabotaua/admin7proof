import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'


export default class OpenRequests extends Component {

    constructor() {
        super();

        this.state = {
            list: null,
            stateIds: 1
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

    render() {

        const {list} = this.state

        return (
            <div style={{marginLeft: 300}}>
                <br/><br/>
                <div>Открытые заявки</div>
                <br/><br/><br/>


                <a href="#employers" onClick={() => this.changeType(1)}
                   style={{color: 'blue', marginTop: 50, marginLeft: 20}}>Работодатели</a>
                <a href="#jobsearchers" onClick={() => this.changeType(2)}
                   style={{color: 'blue', marginTop: 50, marginLeft: 20}}>Соискатели</a>

                <div>
                    { list
                        ? list[0].map(request => {
                            return <p key={request.requestID}>
                                <small><a href="#">{request.requestID}</a></small>
                                &nbsp;&nbsp;
                                {request.userName}
                                <small>({request.eMail})</small>
                            </p>
                        })
                        : <p><br/>LOADING...</p> }
                </div>

            </div>
        );
    }
}