import React, { Component, Fragment, createRef } from "react";
import { connect } from "react-redux";
import MessageList from "./MessageList";
import AddMessage from "./AddMessage";
import SockJsClient from 'react-stomp';
import { addMessage, getMessageList, sendMessage } from "./messageActions";
import listServerErrors from "../global/functions/listServerErrors";
import { openNotification } from "../Notification/notificationActions";
import { withRouter } from "react-router-dom";

class MessageContainer extends Component {

    constructor() {
        super();
        this.clientRef = createRef();
    }

    componentDidMount() {
        // Get room's messages
        this.props.getMessageList(this.props.match.params.code);
    }

    handleMessage(response) {
        const { body, statusCode, statusCodeValue } = response;

        // Request validation errors
        if(statusCode === "BAD_REQUEST") {
            const errorsMsg = listServerErrors(statusCodeValue, body)
            this.props.openNotification(errorsMsg, "error")
        }
        // Message sent with success
        if (statusCode === "OK" && body !== null) {
            this.props.addMessage(body);
            this.props.openNotification("Message envoyé", "success")
        }
    }

    render() {
        return (
            <Fragment>
                <MessageList messages={this.props.messages} />
                <AddMessage roomId={this.props.roomId} sendMessage={this.props.sendMessage} clientRef={this.clientRef.current} />
                <SockJsClient
                    url='http://localhost:8081/websocket-chat/'
                    topics={['/topic/user', "/user/queue/errors"]}
                    onConnect={() => {
                        console.log("connected");
                    }}
                    onDisconnect={() => {
                        console.log("Disconnected");
                    }}
                    onMessage={(response) => this.handleMessage(response)}
                    ref={this.clientRef}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({ messages: state.messages })

const mapDispatchToProps = (dispatch) => ({
    getMessageList: (roomId) => dispatch(getMessageList(roomId)),
    sendMessage: (message, clientRef) => dispatch(sendMessage(message, clientRef)),
    addMessage: (message) => dispatch(addMessage(message)),
    openNotification: (messages, severity) => dispatch(openNotification(messages, severity))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessageContainer));