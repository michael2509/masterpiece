import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from "./Notification";
import { createAccount } from "../SignUp/signUpActions";

class NotificationContainer extends Component {

    state = {
        open: false
    }

    componentDidUpdate(prevProps) {
        if(this.props.notification.date !== prevProps.notification.date) {
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
        const { messages, severity } = this.props.notification;
        const { open } = this.state;

        return <Notification open={open} handleClose={() => this.handleClose()} messages={messages} severity={severity} />
    }
}




const mapStateToProps = (state) => ({ notification: state.notification });
const mapDispatchToProps = (dispatch) => ({ createAccount: (account) => dispatch(createAccount(account)) });

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)