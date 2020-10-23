import React from 'react';
import { connect } from 'react-redux';
import SignUpForm from "./SignUpForm";
import { createUser } from "./signUpActions";
import AuthContainer from '../AuthContainer';

const SignUpFormContainer = ({ createUser }) => (
    <AuthContainer maxWidth="md" >
        <SignUpForm createUser={createUser} />
    </AuthContainer>
)

const mapDispatchToProps = (dispatch) => ({ createUser: (user) => dispatch(createUser(user)) });

export default connect(null, mapDispatchToProps)(SignUpFormContainer)