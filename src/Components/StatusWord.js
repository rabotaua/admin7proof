import React, {Component} from 'react'

export default class StatusWord extends Component {

    statusWordTransform(id) {
        id = parseInt(id, 10); // eslint swears on the second argument :C   It's a radix argument O_O
        return id === 1 ? 'открыта' : id === 2 ? 'в работе' : id === 3 ? 'открыта повторно' : id === 4 ? 'закрыта' : ''
    }

    statusColorTransform(id) {
        id = parseInt(id, 10); // eslint swears on the second argument :C   It's a radix argument O_O
        return id === 1 ? {color: 'green'} : id === 2 ? {color: 'orange'} : id === 3 ? {color: 'lightgreen'} : id === 4 ? {color: 'red'} : {}
    }

    render() {
        return <span style={this.statusColorTransform(this.props.statusId)}>
            <strong>{ this.statusWordTransform(this.props.statusId) }</strong>
        </span>
    }
}