import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {Link} from 'react-router'

import SearchComponent from '../Components/Search'


import {StyleSheet, css} from 'aphrodite'

const tableStyles = StyleSheet.create({
    link: {
        'text-decoration': 'none',
        color: '#283593',
        'font-weight': 'bold'
    },
    th: {
        color: '#283593',
        'font-weight': 'bold'
    }
})


export default class OpenRequests extends Component {

    constructor() {
        super();

        this.state = {
            type: 1,
            stateIds: '0,1,2,3', //all open request
            list: null
        }
    }

    getListRequest(params /* object with parameters */) {
        getListApi(params).then(res => res.json()).then(data => this.setState({list: data}))
    }

    changeType(type = 1) {
        this.setState({type: type, list: null})
        const {stateIds} = this.state;
        this.getListRequest({type, stateIds})
    }

    searchItems(params) {
        this.getListRequest(params);
    }

    searchReset() {
        this.changeType(this.state.type)
    }

    componentWillMount() {
        const {stateIds} = this.state;
        this.getListRequest({type: 1, stateIds})
    }

    statusWord(id) {
        id = parseInt(id, 10); // eslint swears on the second argument :C   It's a radix argument O_O
        return id === 1 ? 'открыта' : id === 2 ? 'в работе' : id === 3 ? 'открыта повторно' : id === 4 ? 'закрыта' : ''
    }

    render() {

        const {list, type} = this.state

        const linkStyle = {color: 'rgba(116, 108, 148, 0.65)', marginTop: 50, marginRight: 20, 'text-decoration': 'none'}

        return (

            <div>
                
                <h1 style={{color: 'rgb(124, 127, 148)', padding: '0 0 0 20px', 'text-transform' : 'uppercase'}}>Открытые заявки</h1>

                <div style={{'background-color' : 'rgba(219, 201, 243, 0.35)', padding: '20px'}}>

                    <a href="#employers" onClick={() => this.changeType(2)}
                       style={Object.assign({}, linkStyle, type === 2 ? {color: '#3D5AFE'} : '')}>Работодатели
                    </a>

                    <a href="#jobsearchers" onClick={() => this.changeType(1)}
                       style={Object.assign({}, linkStyle, type === 1 ? {color: '#3D5AFE'} : '')}>Соискатели
                    </a>
                </div>
                <br/>
                <br/>
                <SearchComponent searchCallback={this.searchItems.bind(this)}
                                 resetCallback={this.searchReset.bind(this)}/>

                <br/>
                <br/>


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
                    <TableBody displayRowCheckbox={false} stripedRows={true}>
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