import { Container } from "@material-ui/core";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import AddMessage from "./Message/AddMessage";
import SingleRoom from "./SingleRoom";
import { getSingleRoom } from "./singleRoomActions";
import SockJsClient from 'react-stomp';
import { addMessage, sendMessage } from "./Message/messageActions";
import listServerErrors from "../../global/functions/listServerErrors";
import { openNotification } from "../../Notification/notificationActions";

class SingleRoomContainer extends Component {

    constructor() {
        super();
        this.clientRef = createRef();
    }

    componentDidMount() {
        // Get Room data
        this.props.getSingleRoom(this.props.match.params.code)       
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
            <Container component="main" maxWidth="md" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleRoom singleRoom={this.props.singleRoom} messages={this.props.messages} />
                <AddMessage sendMessage={this.props.sendMessage} clientRef={this.clientRef.current} />
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
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ singleRoom: state.singleRoom, messages: state.messages })

const mapDispatchToProps = (dispatch) => ({
    getSingleRoom: (code) => dispatch(getSingleRoom(code)),
    sendMessage: (message, clientRef) => dispatch(sendMessage(message, clientRef)),
    addMessage: (message) => dispatch(addMessage(message)),
    openNotification: (messages, severity) => dispatch(openNotification(messages, severity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoomContainer);