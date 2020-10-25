import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import AddMessage from "./Message/AddMessage";
import SingleRoom from "./SingleRoom";
import { getSingleRoom } from "./singleRoomActions";
import SockJsClient from 'react-stomp';
import { addMessage, sendMessage } from "./Message/messageActions";

class SingleRoomContainer extends Component {

    constructor() {
        super();
        this.clientRef = null;
    }

    componentDidMount() {
        if (this.props.singleRoom.id === null) {
            this.props.getSingleRoom(this.props.match.params.code)       
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="lg" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleRoom singleRoom={this.props.singleRoom} messages={this.props.messages} />
                <AddMessage sendMessage={this.props.sendMessage} clientRef={this.clientRef} />
                <SockJsClient
                    url='http://localhost:8081/websocket-chat/'
                    topics={['/topic/user', "/user/queue/errors"]}
                    onConnect={() => {
                        console.log("connected");
                    }}
                    onDisconnect={() => {
                        console.log("Disconnected");
                    }}
                    onMessage={(msg) => {
                        console.log(msg);
                        // this.props.addMessage(msg);
                    }}
                    ref={(client) => {
                        this.clientRef = client
                    }}
                />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ singleRoom: state.singleRoom, messages: state.messages })

const mapDispatchToProps = (dispatch) => ({
    getSingleRoom: (code) => dispatch(getSingleRoom(code)),
    sendMessage: (message, clientRef) => dispatch(sendMessage(message, clientRef)),
    addMessage: (message) => dispatch(addMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoomContainer);