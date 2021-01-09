import React from 'react';
import { connect } from 'react-redux';
import SignUpForm from "./SignUpForm";
import { createSpeaker } from "./signUpActions";
import AuthContainer from '../AuthContainer';

const SignUpFormContainer = ({ createSpeaker }) => (
    <AuthContainer maxWidth="md" >
        <SignUpForm createSpeaker={createSpeaker} />
    </AuthContainer>
)

const mapDispatchToProps = (dispatch) => ({ createSpeaker: (speaker) => dispatch(createSpeaker(speaker)) });

export default connect(null, mapDispatchToProps)(SignUpFormContainer)