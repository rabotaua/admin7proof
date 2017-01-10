import React, {Component} from 'react'
import {StyleSheet, css} from 'aphrodite'


const styles = StyleSheet.create({
    expireDate: {
        backgroundColor: '#FF5252',
        padding: '5px',
        color: '#fff',
        borderRadius: '2px'
    }
})


export default class DateTimeFormatter extends Component {

    constructor() {
        super();

        this.state = {
            expireStatus: false,
            day: '',
            month: '',
            year: '',
            time: '',
            stringDateTime: ''
        }
    }

    checkOnExpired() {

        if (this.props.disableCheckExpire) return false

        const dayInMs = 86400000 // count of milliseconds in one day

        const {day, month, year, time} = this.state

        const formattedTimestamp = new Date(`${month}.${day}.${year} ${time}`).getTime()
        const differenceTime = Date.now() - formattedTimestamp

        differenceTime > dayInMs ? this.setState({expireStatus: true}) : null


    }


    dateTimeFormat() {
        const dateTimeArr = this.props.dateTime.split('T')
        const dateArr = dateTimeArr[0].split('-')

        this.setState({
            day: dateArr[2],
            month: dateArr[1],
            year: dateArr[0],
            time: dateTimeArr[1].substr(0, 5),
            stringDateTime: `${dateArr[2]}.${dateArr[1]}.${dateArr[0]} ${dateTimeArr[1].substr(0, 5)}`
        })

        setTimeout(() => this.checkOnExpired(), 100)
    }

    componentWillMount() {
        if (this.props.dateTime)
            this.dateTimeFormat()
    }


    render() {
        const {stringDateTime, expireStatus} = this.state

        return (
            <span
                className={ expireStatus ? css(styles.expireDate) : '' }>{ stringDateTime ? stringDateTime : '' }</span>
        )
    }
}