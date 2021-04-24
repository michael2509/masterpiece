import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from "./Notification";
import { closeNotification } from './notificationActions';

// Notification container to connect to app state using react
class NotificationContainer extends Component {

    render() {
        const { open, message, severity, closeNotification } = this.props
        return <Notification open={open} closeNotification={closeNotification} message={message} severity={severity} />
    }
}

// Part of the app state to retrieve
const mapStateToProps = (state) => ({
    open: state.notification.open,
    message: state.notification.message,
    severity: state.notification.severity
});

// Actions to retrieve
const mapDispatchToProps = (dispatch) => ({
    closeNotification: () => dispatch(closeNotification())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)