import React, {Component} from "react";
import {Link, browserHistory} from "react-router";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import LatestIcon from "material-ui/svg-icons/action/history";
import Sidebar from "./Sidebar";
import FlatButton from "material-ui/RaisedButton";
import RaisedButton from "material-ui/RaisedButton";
import LatestEvents from "./LatestEvents";
import Badge from "material-ui/Badge";


class Header extends Component {

    constructor() {
        super();

        this.state = {
            sidebarOpen: false,
            latestEventsShow: false,
            latestCount: 0
        }
    }

    componentWillMount() {
        window.addEventListener('newLatest', this.latestEventsCounter.bind(this))
    }

    latestEventsCounter() {
        this.setState({latestCount: this.state.latestCount + 1})
    }

    openCloseSidebar() {
        this.setState({sidebarOpen: !this.state.sidebarOpen})
    }

    latestEventsShowClose() {
        this.setState({latestEventsShow: !this.state.latestEventsShow})
    }

    render() {

        if (this.context.router.location.pathname.indexOf('open') !== -1) {
            this.activeOpenBtn = true
            this.activeDoneBtn = false
        } else if (this.context.router.location.pathname.indexOf('done') !== -1) {
            this.activeOpenBtn = false
            this.activeDoneBtn = true
        } else {
            this.activeOpenBtn = false
            this.activeDoneBtn = false
        }

        const userNameStyle = {
            color: '#fff',
            fontSize: '19px',
            position: 'relative',
            top: '-5px',
            marginRight: '5px',
            borderBottom: '1px dotted #fff',
            marginLeft: '50px'
        }

        const buttonStyle = {
            ...userNameStyle,
            borderBottom: 'none',
            fontSize: '15px',
            top: '-7px',
            marginLeft: 15
        }

        const Logged = () => (
            <div>

                { localStorage.getItem('auth') ?
                    <span>
                        <RaisedButton secondary={this.activeOpenBtn} style={buttonStyle} label="Открытые заявки"
                                      containerElement={<Link to="/requests/open"/>}/>
                        <RaisedButton secondary={this.activeDoneBtn} style={buttonStyle} label="Отработанные заявки"
                                      containerElement={<Link to="/requests/done"/>}/>
                    </span> : '' }

                { localStorage.getItem('auth') ?
                    <span style={userNameStyle }>{localStorage.getItem('userName')}</span> : '' }


                { localStorage.getItem('auth') ?

                    <span style={{position: 'relative'}}>


                        { this.state.latestCount !== 0 ?
                            <span style={{position: 'absolute', top: '-23px', right: '-7px'}}>
                                <Badge
                                    badgeContent={this.state.latestCount}
                                    secondary={true}
                                />
                            </span>

                            : ''

                        }

                        <IconButton
                            onClick={this.latestEventsShowClose.bind(this)}
                            tooltip="Последние действия"
                            style={{marginLeft: 10}}
                        >
                            <LatestIcon color="#fff"/>
                        </IconButton>


                        <LatestEvents open={this.state.latestEventsShow}
                                      openCloseCb={this.latestEventsShowClose.bind(this)}/>
                    </span>

                    : ''
                }

                <IconMenu
                    iconStyle={{color: '#fff'}}
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                >

                    { localStorage.getItem('auth') ?
                        <MenuItem onClick={this.latestEventsShowClose.bind(this)}
                                  primaryText="Последние действия"/> : '' }

                    <MenuItem primaryText="Статистика" containerElement={<Link to="/"/>}/>

                    { localStorage.getItem('auth') ?
                        <MenuItem primaryText="Выйти" containerElement={<Link to="/signout"/>}/> : '' }

                </IconMenu>
            </div>
        )

        return <div>
            <AppBar
                onLeftIconButtonTouchTap={this.openCloseSidebar.bind(this)}
                iconElementRight={ localStorage.getItem('auth') ? <Logged /> :
                    <FlatButton label="Войти" onClick={() => browserHistory['push']('/login')}/>}
                title="RUA - admin7"
            />

            <Sidebar open={this.state.sidebarOpen} openCloseCallback={this.openCloseSidebar.bind(this)}/>
        </div>

    }
}

Header.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Header