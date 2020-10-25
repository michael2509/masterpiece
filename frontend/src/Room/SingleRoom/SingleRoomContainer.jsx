import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import SingleRoom from "./SingleRoom";
import { getSingleRoom } from "./singleRoomActions";

class SingleRoomContainer extends Component {

    componentDidMount() {
        if (this.props.singleRoom.id === null) {
            this.props.getSingleRoom(this.props.match.params.code)       
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="lg" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleRoom singleRoom={this.props.singleRoom} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ singleRoom: state.singleRoom })

const mapDispatchToProps = (dispatch) => ({
    getSingleRoom: (code) => dispatch(getSingleRoom(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoomContainer);