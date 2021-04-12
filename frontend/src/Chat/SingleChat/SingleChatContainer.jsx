import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import SingleChat from "./SingleChat";
import { getSingleChat, openCreateGuest, closeCreateGuest, setSenderName, setSenderType } from "./singleChatActions";
import { openNotification } from "../../Notification/notificationActions";
import MessageContainer from "../../Message/MessageContainer";
import { isLogged, getUsername } from "../../Auth/authService";
import CreateGuest from "./CreateGuest";

class SingleChatContainer extends Component {

    componentDidMount() {

        const chatId = this.props.location.state.chatId;
        // Get chat data
        this.props.getSingleChat(chatId);

        // If user is logged (the speaker of the chat), Set id of the logged user in the component state
        if (isLogged()) {
            console.log("is logged");
            getUsername().then((username) => {
                console.log("username : " + username);
                username ? this.props.setSenderName(username) : console.log("speaker username not found");
                this.props.setSenderType("speaker");
            })
        } else {
            // else create a guest for this chat
            this.props.openCreateGuest();
        }
    }

    render() {
        const chatId = this.props.match.params.chatId

        console.log(this.props.SingleChat);

        return (
            <Container component="main" maxWidth="md" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleChat SingleChat={this.props.SingleChat} />
                <MessageContainer chatId={chatId} />
                <CreateGuest open={this.props.SingleChat.showCreateGuest} openNotif={this.props.openNotification} chatId={this.props.SingleChat.id} closeForm={this.props.closeCreateGuest} setSenderName={this.props.setSenderName} setSenderType={this.props.setSenderType} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ SingleChat: state.SingleChat })

const mapDispatchToProps = (dispatch) => ({
    getSingleChat: (code) => dispatch(getSingleChat(code)),
    openNotification: (messages, severity) => dispatch(openNotification(messages, severity)),
    openCreateGuest: () => dispatch(openCreateGuest()),
    closeCreateGuest: () => dispatch(closeCreateGuest()),
    setSenderName: (senderName) => dispatch(setSenderName(senderName)),
    setSenderType: (senderType) => dispatch(setSenderType(senderType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleChatContainer);