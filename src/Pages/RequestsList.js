import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'
import {normalize, schema} from 'normalizr'


import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import DoneIcon from 'material-ui/svg-icons/action/check-circle'
import InWork from 'material-ui/svg-icons/action/lock-open'
import RaisedButton from 'material-ui/RaisedButton';


import SearchComponent from '../Components/Search'
import RequestTableRow from '../Components/RequestTableRow'
import TabSwitcher from '../Components/TabSwitcher'
import CreateNewRequest from '../Components/CreateNewRequest'

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
            params: {
                type: 2,
                stateIds: this.pageType === 'open' ? '0,1,2,3' : '0,1,2,3,4',
                startRowIndex: ''
            },
            list: {},
            totalCount: null
        }


        // schema for normalizing response
        const requestSchema = new schema.Entity('requests', {}, {idAttribute: 'requestID'});
        this.requestsSchemaList = new schema.Array(requestSchema);
    }

    getListRequest() {

        // console.log('BEFORE FETCH STATE: ', this.state)


        getListApi(this.state.params).then(res => res.json()).then(data => {

            const normalizedData = normalize(data[0], this.requestsSchemaList);

            this.setState({
                list: Object.assign(this.state.list, normalizedData.entities.requests),
                totalCount: data[1][0]['totalCount']
            })
        })
    }

    clearListAndNewState(newParams = {}) {
        // clear state
        this.setState(() => {
            return {
                list: {},
                totalCount: 0,
                params: Object.assign(this.state.params, {
                    requestId: '',
                    notebookId: '',
                    eMail: '',
                    startRowIndex: ''
                })
            }
        }, () => { // after clearing set new state

            // console.debug('state after clear:', this.state.params)

            this.setState(() => {
                return {
                    params: {
                        ...this.state.params,
                        ...newParams
                    }
                }
            }, () => {

                // console.debug('state prefetch:', this.state.params)

                this.getListRequest()
            }) // and fetch data with new parameters
        })
    }


    changeType(type = 1) {
        this.clearListAndNewState({type})
    }

    searchItems(params) {
        this.clearListAndNewState({...params})
    }

    searchReset() {
        this.clearListAndNewState({type: 2})
    }

    showMore() {
        const currentCount = Object.keys(this.state.list).length
        const totalCount = this.state.totalCount

        console.log('currentCount: ', currentCount, 'totalCount: ', totalCount)

        if (totalCount > currentCount) {
            this.setState({
                params: {
                    ...this.state.params,
                    startRowIndex: currentCount
                }
            }, this.getListRequest)
        }
    }

    componentWillMount() {
        const {stateIds} = this.state;
        this.getListRequest({type: 2, stateIds})
    }

    render() {

        // console.log(this.state)

        const {list, params, totalCount} = this.state
        const currentCount = Object.keys(list).length


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

                <CreateNewRequest />

                <h1 style={{float: 'left', margin: 0, padding: '25px'}}>
                    { this.pageType === 'open'
                        ? <span><InWork style={iconStyle}/>Открытые заявки</span>
                        : <span><DoneIcon style={iconStyle}/>Отработанные заявки</span>
                    }
                </h1>


                <SearchComponent searchCallback={this.searchItems.bind(this)}
                                 resetCallback={this.searchReset.bind(this)}/>

                <TabSwitcher pageType={this.pageType} currentType={params.type}
                             changeTypeCallback={this.changeType.bind(this)}
                             totalCount={ totalCount && totalCount > 0 ? totalCount : false }/>

                <Table selectable={false}>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn className={css(tableStyles.th)}>ID заявки</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>ID блокнота</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Email</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Тема</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Подтема</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Статус</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Ответственный</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}>Дата/время</TableHeaderColumn>
                            <TableHeaderColumn className={css(tableStyles.th)}/>
                        </TableRow>
                    </TableHeader>

                    <TableBody displayRowCheckbox={false}>
                        { list
                            ? Object.keys(list).map(key => <RequestTableRow
                                key={list[key].requestID}
                                requestID={list[key].requestID}
                                notebookID={list[key].notebookID}
                                eMail={list[key].eMail}
                                subjectName={list[key].subjectName}
                                subSubjectName={list[key].subSubjectName}
                                state={list[key].state}
                                responsibleLogin={list[key].responsibleLogin}
                                date={list[key].date}
                                    disableCheckExpire={this.pageType === 'done'}
                                />)

                            : <TableRow>
                                <TableRowColumn style={{textAlign: 'center', padding: '50px 0'}}>
                                    <CircularProgress size={80}/>
                                </TableRowColumn>
                            </TableRow>
                        }

                    </TableBody>
                </Table>

                <RaisedButton fullWidth={true} primary={true} label="Показать еще..." onClick={this.showMore.bind(this)}
                              disabled={ !(totalCount > currentCount) }/>

            </div>
        )
    }
}

RequestsList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default RequestsList