import React, { Component, Fragment, createRef } from "react";
import { connect } from "react-redux";
import MessageList from "./MessageList";
import AddMessage from "./AddMessage";
import SockJsClient from 'react-stomp';
import { addMessage, getMessageList } from "./messageActions";
import listServerErrors from "../global/functions/listServerErrors";
import { openNotification } from "../Notification/notificationActions";
import { withRouter } from "react-router-dom";

class MessageContainer extends Component {

    constructor() {
        super();
        this.sockJsClient = createRef();
    }

    componentDidMount() {
        // Get chat's messages
        console.log("component did mount");
        this.props.getMessageList(this.props.chat.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.chat.id !== this.props.chat.id) {
            console.log("component did update");
            this.props.getMessageList(this.props.chat.id);
        }
    }

    handleMessage(response, topic) {
        const { body, statusCode, statusCodeValue } = response;

        // Message received with success
        if (statusCode === "OK" && body !== null) {
            this.props.addMessage(body.senderName, body.text);
        }
        // Show success notif if message sent with success
        if (topic === "/user/queue/success") {
            this.props.openNotification("Message envoyé", "success");
        }
        // Show error notif if message sending failed
        if(topic === "/user/queue/errors") {
            const errorsMsg = listServerErrors(statusCodeValue, body)
            this.props.openNotification(errorsMsg, "error")
        }
    }

    render() {
        return (
            <Fragment>
                <MessageList messages={this.props.messages} />
                <AddMessage chatId={this.props.chat.id} senderName={this.props.chat.senderName} senderType={this.props.chat.senderType} sockJsClient={this.sockJsClient.current} />
                <SockJsClient
                    url='http://localhost:8081/websocket-chat/'
                    topics={['/topic/user', "/user/queue/errors", "/user/queue/success"]}
                    onConnect={() => {
                        console.log("connected");
                    }}
                    onDisconnect={() => {
                        console.log("Disconnected");
                    }}
                    onMessage={(response, topic) => this.handleMessage(response, topic)}
                    ref={this.sockJsClient}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    chat: state.SingleChat
})

const mapDispatchToProps = (dispatch) => ({
    getMessageList: (chatId) => dispatch(getMessageList(chatId)),
    addMessage: (username, message) => dispatch(addMessage(username, message)),
    openNotification: (messages, severity) => dispatch(openNotification(messages, severity))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessageContainer));