import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from "./SignUpForm";
import Notification from "../Notification/Notification";
import { createAccount } from "./signUpActions";

class SignUpFormContainer extends Component {

    state = {
        open: false
    }

    componentDidUpdate(prevProps) {
        if(this.props.signUp.date !== prevProps.signUp.date) {
            this.setState({ open: true })
        }
      } 

    handleClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false })
    };

    render() {
        const { createAccount } = this.props;
        const { messages, severity } = this.props.signUp;
        const { open } = this.state;

        return (
            <div>
                <SignUpForm createAccount={createAccount} />
                <Notification open={open} handleClose={() => this.handleClose()} messages={messages} severity={severity} />
            </div>
        )
    }
}




const mapStateToProps = (state) => ({ signUp: state.signUp });
const mapDispatchToProps = (dispatch) => ({ createAccount: (account) => dispatch(createAccount(account)) });

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer)