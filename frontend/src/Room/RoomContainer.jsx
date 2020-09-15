import React, { Component } from 'react';
import RoomList from './RoomList';
import AddRoom from './AddRoom';
import { createRoom, deleteRoom, getRoomListPage } from "./roomActions";
import { connect } from "react-redux";
import { isLogged } from '../Auth/authService';

class RoomContainer extends Component {

    componentDidMount() {
        const { getRoomListPage, pageNumber } = this.props;
        getRoomListPage(pageNumber);
    }

    render() {
        const { createRoom, deleteRoom, getRoomListPage, roomListPage, pageNumber, totalPages, history } = this.props;
        const logged = isLogged();

        if (!logged) {
            history.push("/connexion")
        }

        return (
            <div>
                <RoomList totalPages={totalPages} roomListPage={roomListPage} getRoomListPage={getRoomListPage} pageNumber={pageNumber} deleteRoom={deleteRoom} />
                <AddRoom createRoom={createRoom} getRoomListPage={getRoomListPage} pageNumber={pageNumber} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    pageNumber: state.rooms.pageNumber,
    roomListPage: state.rooms.roomListPage,
    totalPages: state.rooms.totalPages
});

const mapDispatchToProps = (dispatch) => ({
    createRoom: (room) => dispatch(createRoom(room)),
    deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
    getRoomListPage: (pageNumber) => dispatch(getRoomListPage(pageNumber)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);