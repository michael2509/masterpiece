import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from "./Navbar";
import { openNotification } from '../../Notification/notificationActions';

// Navbar container component used to connect to application state using redux
class NavbarContainer extends Component {

    render() {
        return <Navbar openNotification={this.props.openNotification} navbarHeight={this.props.navbarHeight} />
    }
}

// Part of the application state to retrive
const mapStateToProps = (state) => ({ navbarHeight: state.navbar.height })

// Actions to retrieve
const mapDispatchToProps = (dispatch) => ({
    openNotification: (message, severity) => dispatch(openNotification(message, severity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)