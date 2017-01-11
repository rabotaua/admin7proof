import React, {Component} from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import EmployerIcon from 'material-ui/svg-icons/action/work'
import JobsearcherIcon from 'material-ui/svg-icons/action/search'
import Badge from 'material-ui/Badge'


export default class TabSwitcher extends Component {

    constructor() {
        super();

        this.state = {
            activeTab: 1
        }
    }

    tabClick(type, tabId) {
        this.props.changeTypeCallback(type)
        this.setState({activeTab: tabId})
    }

    render() {

        const badgeStyle = {
            position: 'absolute',
            top: '-37px',
            left: '50%',
            transform: 'translateX(-50%)',
            marginLeft: '12px'
        }

        const {totalCount, pageType} = this.props
        const {activeTab} = this.state

        return (
            <Tabs>
                <Tab
                    onActive={() => this.tabClick(2, 1)}
                    icon={<EmployerIcon />}
                    label={
                        <span style={{position: 'relative'}}>
                            РАБОТОДАТЕЛИ
                            { totalCount && activeTab === 1 && pageType === 'open' ?
                                <Badge style={badgeStyle} badgeContent={totalCount} secondary={true}/> : '' }
                        </span>
                    }
                />
                <Tab
                    onActive={() => this.tabClick(1, 2)}
                    icon={<JobsearcherIcon />}
                    label={
                        <span style={{position: 'relative'}}>
                            СОИСКАТЕЛИ
                            { totalCount && activeTab === 2 && pageType === 'open' ?
                                <Badge style={badgeStyle} badgeContent={this.props.totalCount} secondary={true}/> : '' }
                        </span>
                    }
                />
            </Tabs>
        )
    }
}