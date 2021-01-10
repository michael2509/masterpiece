import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import SingleRoom from "../SingleRoom/SingleRoom";
import { getSingleRoom, openCreateGuest, closeCreateGuest, setcurrentUsername } from "../SingleRoom/singleRoomActions";
import { openNotification } from "../../Notification/notificationActions";
import MessageContainer from "../../Message/MessageContainer";
import { isLogged, getUsername } from "../../Auth/authService";
import CreateGuest from "./CreateGuest";

class SingleRoomContainer extends Component {

    componentDidMount() {
        // Get Room data
        this.props.getSingleRoom(this.props.match.params.code);

        // If user is logged (the speaker of the room), Set id of the logged user in the component state
        if (isLogged()) {
            console.log("is logged");
            getUsername().then((username) => {
                console.log(username);
                username ? this.props.setcurrentUsername(username) : console.log("current username not found");;
            })
        } else {
            // else create a guest for this room
            this.props.openCreateGuest();
        }
    }

    render() {
        const roomCode = this.props.match.params.code

        console.log(this.props.singleRoom);

        return (
            <Container component="main" maxWidth="md" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleRoom singleRoom={this.props.singleRoom} />
                <MessageContainer roomCode={roomCode} username={this.props.singleRoom.currentUsername} />
                <CreateGuest open={this.props.singleRoom.showCreateGuest} openNotif={this.props.openNotification} roomCode={roomCode} closeForm={this.props.closeCreateGuest} setcurrentUsername={this.props.setcurrentUsername} />
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
    setcurrentUsername: (username) => dispatch(setcurrentUsername(username)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoomContainer);