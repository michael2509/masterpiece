import React, { Component } from 'react';
import RoomList from './RoomList';
import AddRoom from './AddRoom';
import { createRoom, deleteRoom, getRoomListPage, openUpdateRoom, closeUpdateRoom, updateRoom } from "./roomActions";
import { connect } from "react-redux";
import { isLogged } from '../Auth/authService';
import UpdateRoom from './UpdateRoom';

class RoomContainer extends Component {

    componentDidMount() {
        const { getRoomListPage, roomState } = this.props;

        getRoomListPage(roomState.pageNumber);
    }

    render() {
        const { roomState, createRoom, deleteRoom, getRoomListPage, openUpdateRoom, closeUpdateRoom, updateRoom, history } = this.props;
        const { roomListPage, pageNumber, totalPages, updateRoomState } = roomState;

        const logged = isLogged();

        if (!logged) {
            history.push("/connexion")
        }

        return (
            <div>
                <RoomList totalPages={totalPages} roomListPage={roomListPage} getRoomListPage={getRoomListPage} pageNumber={pageNumber} deleteRoom={deleteRoom} openUpdateRoom={openUpdateRoom} />
                <AddRoom createRoom={createRoom} getRoomListPage={getRoomListPage} pageNumber={pageNumber} />
                <UpdateRoom state={updateRoomState} handleClose={closeUpdateRoom} updateRoom={updateRoom} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ roomState: state.rooms });

const mapDispatchToProps = (dispatch) => ({
    createRoom: (room) => dispatch(createRoom(room)),
    updateRoom: (room) => dispatch(updateRoom(room)),
    deleteRoom: (roomId) => dispatch(deleteRoom(roomId)),
    getRoomListPage: (pageNumber) => dispatch(getRoomListPage(pageNumber)),
    openUpdateRoom: (roomId) => dispatch(openUpdateRoom(roomId)),
    closeUpdateRoom: () => dispatch(closeUpdateRoom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);