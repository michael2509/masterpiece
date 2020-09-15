import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from "./LoginForm";
import { loginSuccess, loginError } from './loginActions';

class LoginFormContainer extends Component {

    render() {
        const { loginSuccess, loginError } = this.props;

        return <LoginForm loginSuccess={loginSuccess} loginError={loginError} />
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginSuccess: (username) => dispatch(loginSuccess(username)),
    loginError: (errorMessages) => dispatch(loginError(errorMessages))
});

export default connect(null, mapDispatchToProps)(LoginFormContainer)