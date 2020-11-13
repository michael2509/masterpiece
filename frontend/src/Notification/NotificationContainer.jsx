import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from "./Notification";
import { closeNotification } from './notificationActions';

class NotificationContainer extends Component {

    render() {
        const { open, message, severity, closeNotification } = this.props
        return <Notification open={open} closeNotification={closeNotification} message={message} severity={severity} />
    }
}

const mapStateToProps = (state) => ({
    open: state.notification.open,
    message: state.notification.message,
    severity: state.notification.severity
});

const mapDispatchToProps = (dispatch) => ({
    closeNotification: () => dispatch(closeNotification())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)