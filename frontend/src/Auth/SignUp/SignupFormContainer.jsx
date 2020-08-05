import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from "./SignUpForm";
import { createAccount } from "./signUpActions";

class SignUpFormContainer extends Component {

    render() {
        const { createAccount } = this.props;

        return <SignUpForm createAccount={createAccount} />
    }
}

const mapDispatchToProps = (dispatch) => ({ createAccount: (account) => dispatch(createAccount(account)) });

export default connect(null, mapDispatchToProps)(SignUpFormContainer)