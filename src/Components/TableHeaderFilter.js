import React, {Component} from "react";
import {StyleSheet, css} from 'aphrodite'
import SortDirectonDown from 'material-ui/svg-icons/navigation/arrow-drop-down'
import SortDirectonUp from 'material-ui/svg-icons/navigation/arrow-drop-up'
import {TableHeaderColumn} from 'material-ui/Table'


const tableStyles = StyleSheet.create({
    th: {
        color: '#283593',
        fontWeight: 'bold',
        cursor: 'pointer'
    }
})


export default class TableHeaderFilter extends Component {
    render() {

        const sortDirectionIconStyle = {
            color: '#999',
            position: 'absolute',
            top: '-5px',
            left: '-26px'
        }

        return (
            <TableHeaderColumn className={css(tableStyles.th)}>
                <span onClick={this.props.filterCallback}
                      data-filter={this.props.filterName}
                      style={{position: 'relative'}}>

                    { this.props.sortField === this.props.filterName
                        ? this.props.sortDirection === 'asc' ?
                            <SortDirectonUp style={sortDirectionIconStyle}/>
                            : <SortDirectonDown style={sortDirectionIconStyle}/>

                        : ''
                    }

                    {this.props.titleName}
                </span>
            </TableHeaderColumn>

        )
    }
}