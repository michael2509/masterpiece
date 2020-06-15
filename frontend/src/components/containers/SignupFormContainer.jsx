import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUpForm from "../SignUpForm/SignUpForm";
import Notification from "../Notification/Notification";
import { createAccount } from "../../redux/actions/actions";

class SignUpFormContainer extends Component {

    state = {
        open: false
    }

    componentDidUpdate(prevProps) {
        if(this.props.signUp.date !== prevProps.signUp.date) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
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
        const { message, status } =this.props.signUp;
        const { open } = this.state;

        return (
            <div>
                <SignUpForm createAccount={createAccount} />
                <Notification open={open} handleClose={() => this.handleClose()} message={message} severity={status} />
            </div>
        )
    }
}




const mapStateToProps = (state) => ({ signUp: state.signUp });
const mapDispatchToProps = (dispatch) => ({ createAccount: (user) => dispatch(createAccount(user)) });

export default connect(mapStateToProps, mapDispatchToProps)(SignUpFormContainer)