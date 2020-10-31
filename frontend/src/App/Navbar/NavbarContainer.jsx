import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from "./Navbar";
import { openNotification } from '../../Notification/notificationActions';


class NavbarContainer extends Component {

    render() {
        return <Navbar openNotification={this.props.openNotification} navbarHeight={this.props.navbarHeight} />
    }
}

const mapStateToProps = (state) => ({ navbarHeight: state.navbar.height })

const mapDispatchToProps = (dispatch) => ({
    openNotification: (message, severity) => dispatch(openNotification(message, severity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)