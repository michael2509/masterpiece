import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from "./SignUpForm";
import { createUser } from "./signUpActions";
import AuthContainer from '../AuthContainer';

class SignUpFormContainer extends Component {

    render() {
        const { createUser } = this.props;

        return (
            <AuthContainer maxWidth="md" >
                <SignUpForm createUser={createUser} />
            </AuthContainer>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({ createUser: (user) => dispatch(createUser(user)) });

export default connect(null, mapDispatchToProps)(SignUpFormContainer)