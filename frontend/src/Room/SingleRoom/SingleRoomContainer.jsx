import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import SingleRoom from "../SingleRoom/SingleRoom";
import { getSingleRoom, openCreateGuest, closeCreateGuest, setSenderName, setSenderType } from "../SingleRoom/singleRoomActions";
import { openNotification } from "../../Notification/notificationActions";
import MessageContainer from "../../Message/MessageContainer";
import { isLogged, getUsername } from "../../Auth/authService";
import CreateGuest from "./CreateGuest";

class SingleRoomContainer extends Component {

    componentDidMount() {

        const chatId = this.props.location.state.roomId;
        // Get Room data
        this.props.getSingleRoom(chatId);

        // If user is logged (the speaker of the room), Set id of the logged user in the component state
        if (isLogged()) {
            console.log("is logged");
            getUsername().then((username) => {
                console.log("username : " + username);
                username ? this.props.setSenderName(username) : console.log("speaker username not found");
                this.props.setSenderType("Speaker");
            })
        } else {
            // else create a guest for this room
            this.props.openCreateGuest();
        }
    }

    render() {
        const roomId = this.props.match.params.roomId

        console.log(this.props.singleRoom);

        return (
            <Container component="main" maxWidth="md" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleRoom singleRoom={this.props.singleRoom} />
                <MessageContainer roomId={roomId} />
                <CreateGuest open={this.props.singleRoom.showCreateGuest} openNotif={this.props.openNotification} roomId={this.props.singleRoom.id} closeForm={this.props.closeCreateGuest} setSenderName={this.props.setSenderName} setSenderType={this.props.setSenderType} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ singleRoom: state.singleRoom })

const mapDispatchToProps = (dispatch) => ({
    getSingleRoom: (code) => dispatch(getSingleRoom(code)),
    openNotification: (messages, severity) => dispatch(openNotification(messages, severity)),
    openCreateGuest: () => dispatch(openCreateGuest()),
    closeCreateGuest: () => dispatch(closeCreateGuest()),
    setSenderName: (senderName) => dispatch(setSenderName(senderName)),
    setSenderType: (senderType) => dispatch(setSenderType(senderType)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoomContainer);