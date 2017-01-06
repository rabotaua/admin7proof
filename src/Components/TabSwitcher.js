import React, {Component} from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import EmployerIcon from 'material-ui/svg-icons/action/work'
import JobsearcherIcon from 'material-ui/svg-icons/action/search'


export default class TabSwitcher extends Component {
    render() {
        return (
            <Tabs>
                <Tab
                    onActive={() => this.props.changeTypeCallback(2)}
                    icon={<EmployerIcon />}
                    label="РАБОТОДАТЕЛИ"
                />
                <Tab
                    onActive={() => this.props.changeTypeCallback(1)}
                    icon={<JobsearcherIcon />}
                    label="СОИСКАТЕЛИ"
                />
            </Tabs>
        )
    }
}