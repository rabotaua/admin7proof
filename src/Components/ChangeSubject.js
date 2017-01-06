import React, {Component} from 'react'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'


export default class ChangeSubject extends Component {
    render() {
        return (
            <span style={{position: 'relative', top: '12px', marginLeft: '70px'}}>

                <DropDownMenu value={1} autoWidth={true}>
                    <MenuItem value={1} primaryText="Тема"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
                    <MenuItem value={4} primaryText="Weekends"/>
                    <MenuItem value={5} primaryText="Weekly"/>
                </DropDownMenu>

                <DropDownMenu value={1} autoWidth={true}>
                    <MenuItem value={1} primaryText="Подтема"/>
                    <MenuItem value={2} primaryText="Every Night"/>
                    <MenuItem value={3} primaryText="Weeknights"/>
                    <MenuItem value={4} primaryText="Weekends"/>
                    <MenuItem value={5} primaryText="Weekly"/>
                </DropDownMenu>
            </span>
        )
    }
}