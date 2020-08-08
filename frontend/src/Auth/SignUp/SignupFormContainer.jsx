import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from "./SignUpForm";
import { createUser } from "./signUpActions";

class SignUpFormContainer extends Component {

    render() {
        const { createUser } = this.props;

        return <SignUpForm createUser={createUser} />
    }
}

const mapDispatchToProps = (dispatch) => ({ createUser: (user) => dispatch(createUser(user)) });

export default connect(null, mapDispatchToProps)(SignUpFormContainer)