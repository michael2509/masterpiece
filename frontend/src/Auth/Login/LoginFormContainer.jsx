import React from 'react';
import { connect } from 'react-redux';
import LoginForm from "./LoginForm";
import AuthContainer from '../AuthContainer';
import { openNotification } from '../../Notification/notificationActions';

const LoginFormContainer = ({ openNotification }) => {

    return (
        <AuthContainer maxWidth="md" >
            <LoginForm openNotification={openNotification} />
        </AuthContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    openNotification: (message, severity) => dispatch(openNotification(message, severity)),
});

export default connect(null, mapDispatchToProps)(LoginFormContainer)