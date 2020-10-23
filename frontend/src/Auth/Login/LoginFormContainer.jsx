import React from 'react';
import { connect } from 'react-redux';
import LoginForm from "./LoginForm";
import { loginSuccess, loginError } from './loginActions';
import AuthContainer from '../AuthContainer';

const LoginFormContainer = ({ loginSuccess, loginError }) => {

    return (
        <AuthContainer maxWidth="md" >
            <LoginForm loginSuccess={loginSuccess} loginError={loginError} />
        </AuthContainer>
    )
}

const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (username) => dispatch(loginSuccess(username)),
    loginError: (errorMessages) => dispatch(loginError(errorMessages))
});

export default connect(null, mapDispatchToProps)(LoginFormContainer)