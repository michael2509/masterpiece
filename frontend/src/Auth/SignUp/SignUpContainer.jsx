import React from 'react';
import { connect } from 'react-redux';
import SignUp from "./SignUp";
import { createSpeaker } from "./signUpActions";
import AuthContainer from '../AuthContainer';

const SignUpContainer = ({ createSpeaker }) => (
    <AuthContainer maxWidth="md" >
        <SignUp createSpeaker={createSpeaker} />
    </AuthContainer>
)

const mapDispatchToProps = (dispatch) => ({ createSpeaker: (speaker) => dispatch(createSpeaker(speaker)) });

export default connect(null, mapDispatchToProps)(SignUpContainer)