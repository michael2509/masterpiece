import React from 'react';
import { connect } from 'react-redux';
import Login from "./Login";
import AuthContainer from '../AuthContainer';
import { openNotification } from '../../Notification/notificationActions';

// Login Container to connect to app state using redux
const LoginContainer = ({ openNotification }) => {

    return (
        <AuthContainer maxWidth="md" >
            <Login openNotification={openNotification} />
        </AuthContainer>
    )
}

// Actions to retrieve
const mapDispatchToProps = (dispatch) => ({
    openNotification: (message, severity) => dispatch(openNotification(message, severity)),
});

export default connect(null, mapDispatchToProps)(LoginContainer)