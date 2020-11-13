import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import SingleRoom from "../SingleRoom/SingleRoom";
import { getSingleRoom } from "../SingleRoom/singleRoomActions";
import { openNotification } from "../../Notification/notificationActions";
import MessageContainer from "../../Message/MessageContainer";

class SingleRoomContainer extends Component {

    componentDidMount() {
        // Get Room data
        this.props.getSingleRoom(this.props.match.params.code)       
    }

    render() {
        return (
            <Container component="main" maxWidth="md" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleRoom singleRoom={this.props.singleRoom} />
                <MessageContainer />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ singleRoom: state.singleRoom })

const mapDispatchToProps = (dispatch) => ({
    getSingleRoom: (code) => dispatch(getSingleRoom(code)),
    openNotification: (messages, severity) => dispatch(openNotification(messages, severity))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoomContainer);