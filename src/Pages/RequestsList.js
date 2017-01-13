import React, {Component} from "react"
import {getListApi} from '../Utils/fetchApi'
import {normalize, schema} from 'normalizr'
import InfiniteScroll from 'react-infinite-scroller';
import findIndex from 'lodash/findIndex'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import CircularProgress from 'material-ui/CircularProgress'
import DoneIcon from 'material-ui/svg-icons/action/check-circle'
import InWork from 'material-ui/svg-icons/action/lock-open'


import SearchComponent from '../Components/Search'
import RequestTableRow from '../Components/RequestTableRow'
import TabSwitcher from '../Components/TabSwitcher'
import CreateNewRequest from '../Components/CreateNewRequest'
import TableHeaderFilter from '../Components/TableHeaderFilter'



import {StyleSheet, css} from 'aphrodite'

const tableStyles = StyleSheet.create({
    link: {
        textDecoration: 'none',
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
            hasMore: true,
            pendingList: false,
            params: {
                type: 2,
                stateIds: this.pageType === 'open' ? '0,1,2,3' : '0,1,2,3,4',
                startRowIndex: ''
            },
            list: {},
            arrayOfItems: [],
            totalCount: null
        }

        // schema for normalizing response
        const requestSchema = new schema.Entity('requests', {}, {idAttribute: 'requestID'});
        this.requestsSchemaList = new schema.Array(requestSchema);

        this.filtersList = [
            {filterName: 'requestId', titleName: 'ID заявки'},
            {filterName: 'notebookId', titleName: 'ID блокнота'},
            {filterName: 'email', titleName: 'Email'},
            {filterName: 'subjectName', titleName: 'Тема'},
            {filterName: 'subSubjectName', titleName: 'Подтема'},
            {filterName: 'state', titleName: 'Статус'},
            {filterName: 'responsibleLogin', titleName: 'Ответственный'},
            {filterName: 'date', titleName: 'Дата/время'},
        ]
    }

    getListRequest() {

        this.setState({pendingList: true})
        getListApi(this.state.params).then(res => res.json()).then(data => {

            const normalizedData = normalize(data[0], this.requestsSchemaList);

            this.setState({
                list: Object.assign(this.state.list, normalizedData.entities.requests),
                arrayOfItems: this.state.arrayOfItems.concat(normalizedData.result),
                totalCount: data[1][0]['totalCount']
            })

        }).then(() => this.setState({pendingList: false}))
    }

    clearListAndNewState(newParams = {}) {

        // clear state
        const clearStateObj = {
            list: {},
            arrayOfItems: [],
            totalCount: 0,
            hasMore: true,
            params: {
                ...this.state.params,
                requestId: '',
                notebookId: '',
                eMail: '',
                startRowIndex: '',
                ...newParams
            }
        }

        this.setState(() => clearStateObj, this.getListRequest) // and fetch data with new parameters
    }


    changeType(type = 1) {
        this.clearListAndNewState({type, sortField: '', sortDirection: ''})
    }

    searchItems(params) {
        this.clearListAndNewState({...params})
    }

    searchReset() {
        this.changeType(2)
    }

    filterBy(e) {
        const filterName = e.target.getAttribute('data-filter')
        const filterIndexInArr = findIndex(this.filtersList, (o) => o.filterName === filterName)
        const currentFilter = this.state.params.sortField

        if (filterIndexInArr !== -1) {
            this.clearListAndNewState({
                sortField: filterName,
                startRowIndex: '',
                sortDirection: currentFilter === filterName ?

                    (this.state.params.sortDirection === 'desc') ||
                    (this.state.params.sortDirection === '') ? 'asc' : 'desc'

                    : 'desc'
            })
        }
    }

    showMore() {

        if (this.state.pendingList) return

        const currentCount = Object.keys(this.state.list).length
        const totalCount = this.state.totalCount

        if (totalCount > currentCount) {
            this.setState({
                params: {
                    ...this.state.params,
                    startRowIndex: currentCount
                }
            }, this.getListRequest)
        }
        else {
            this.setState({hasMore: false})
        }
    }

    componentWillMount() {
        const {stateIds} = this.state;
        this.getListRequest({type: 2, stateIds})
    }

    render() {

        const {list, arrayOfItems, params, totalCount} = this.state
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


        const PendingLoader = () => {

            if (!(totalCount > currentCount)) return null

            return (
                <div style={{textAlign: 'center', padding: '50px 0'}}>
                    <CircularProgress size={80}/>
                </div>
            )
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


                <InfiniteScroll
                    initialLoad={false}
                    threshold={200}
                    hasMore={this.state.hasMore}
                    loadMore={() => {
                        setTimeout(this.showMore.bind(this), 500)
                    }}
                    loader={<PendingLoader />}
                >

                    <Table selectable={false}>
                        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                            <TableRow>
                                {
                                    this.filtersList.map(el => {
                                        return (
                                            <TableHeaderFilter
                                                key={el.filterName}
                                                filterName={el.filterName}
                                                titleName={el.titleName}
                                                sortDirection={this.state.params.sortDirection}
                                                sortField={this.state.params.sortField}
                                                filterCallback={this.filterBy.bind(this)}
                                            />
                                        )
                                    })
                                }

                                <TableHeaderColumn className={css(tableStyles.th)}/> {/* for TakeAJob button */}

                            </TableRow>
                        </TableHeader>

                        <TableBody displayRowCheckbox={false}>

                            { list
                                ? arrayOfItems.map(key => <RequestTableRow
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
                </InfiniteScroll>
            </div>
        )
    }
}

RequestsList.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default RequestsList