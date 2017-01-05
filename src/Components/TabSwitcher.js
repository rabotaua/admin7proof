import React, {Component} from 'react'


export default class TabSwitcher extends Component {
    render() {

        const linkStyle = {color: '#CE93D8', marginTop: 50, marginRight: 20, textDecoration: 'none'}

        return (
            <div style={{backgroundColor: 'rgba(219, 201, 243, 0.35)', padding: '20px'}}>

                <a href="#employers" onClick={() => this.props.changeTypeCallback(2)}
                   style={Object.assign({}, linkStyle, this.props.currentType === 2 ? {color: '#3D5AFE'} : '')}>Работодатели
                </a>

                <a href="#jobsearchers" onClick={() => this.props.changeTypeCallback(1)}
                   style={Object.assign({}, linkStyle, this.props.currentType === 1 ? {color: '#3D5AFE'} : '')}>Соискатели
                </a>
            </div>
        )
    }
}