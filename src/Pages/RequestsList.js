import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import DoneIcon from 'material-ui/svg-icons/action/check-circle'
import InWork from 'material-ui/svg-icons/action/lock-open'


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


class RequestsList extends Component {

    constructor(props, context) {
        super(props, context);

        this.pageType = '';

        if (this.context.router.location.pathname.indexOf('open') !== -1) {
            this.pageType = 'open'
        } else if (this.context.router.location.pathname.indexOf('done') !== -1) {
            this.pageType = 'done'
        }

        this.state = {
            type: 2,
            stateIds: this.pageType === 'open' ? '0,1,2,3' : '0,1,2,3,4',
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
        this.getListRequest({type: 2, stateIds})
    }

    render() {

        const {list, type} = this.state

        const iconStyle = {
            color: 'rgb(124, 127, 148)',
            height: 40,
            width: 40,
            position: 'relative',
            top: '-3px',
            verticalAlign: 'middle',
            marginRight: 20
        }

        return (

            <div>
                <h1 style={{
                    color: 'rgb(124, 127, 148)',
                    padding: '0 0 0 20px',
                    textTransform: 'uppercase',
                    float: 'left'
                }}>
                    { this.pageType === 'open'
                        ? <span><InWork style={iconStyle}/>Открытые заявки</span>
                        : <span><DoneIcon style={iconStyle}/>Отработанные заявки</span>
                    }
                </h1>


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

                    <TableBody displayRowCheckbox={false}>

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
        )
    }
}

RequestsList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default RequestsList