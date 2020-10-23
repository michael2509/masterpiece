import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import SingleRoom from "./SingleRoom";
import { getRoom } from "./singleRoomActions";

class SingleRoomContainer extends Component {

    componentDidMount() {
        this.props.getRoom(this.props.match.params.code)
    }

    render() {
        console.log(this.props);
        return (
            <Container component="main" maxWidth="md" style={{ minHeight: `calc(100vh - 150px)`, marginTop: 150}}>
                <SingleRoom singleRoom={this.props.singleRoom} />
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({ singleRoom: state.singleRoom })

const mapDispatchToProps = (dispatch) => ({
    getRoom: (code) => dispatch(getRoom(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleRoomContainer);