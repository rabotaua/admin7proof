import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'


import SearchComponent from '../Components/Search'
import RequestTableRow from '../Components/RequestTableRow'
import TabSwitcher from '../Components/TabSwitcher'

import {StyleSheet, css} from 'aphrodite'

const tableStyles = StyleSheet.create({
    link: {
        textDecoration: 'none',
        color: '#283593',
        fontWeight: 'bold'
    },
    th: {
        color: '#283593',
        fontWeight: 'bold'
    }
})


export default class OpenRequests extends Component {

    constructor() {
        super();

        this.state = {
            type: 2,
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

    render() {

        const {list, type} = this.state

        return (

            <div>
                <h1 style={{color: '#3F51B5', padding: '0 0 0 20px', textTransform: 'uppercase'}}>Открытые заявки</h1>


                <SearchComponent searchCallback={this.searchItems.bind(this)}
                                 resetCallback={this.searchReset.bind(this)}/>
                <br/><br/>
                <TabSwitcher currentType={type} changeTypeCallback={this.changeType.bind(this)}/>

                <Table selectable={false}>
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
                        { list && list.length > 0
                            ? list[0].map(request =>
                                <RequestTableRow
                                    key={request.requestID}
                                    requestID={request.requestID}
                                    notebookID={request.notebookID}
                                    eMail={request.eMail}
                                    subjectName={request.subjectName}
                                    subSubjectName={request.subSubjectName}
                                    state={request.state}
                                />)

                            : <TableRow>
                                <TableRowColumn style={{textAlign: 'center', padding: '50px 0'}}>
                                    <CircularProgress size={80}/>
                                </TableRowColumn>
                            </TableRow>
                        }

                    </TableBody>
                </Table>

            </div>
        );
    }
}