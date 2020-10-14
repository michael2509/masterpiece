import React, { Component } from 'react';
import RoomList from './RoomList';
import AddRoom from './AddRoom';
import { createRoom, deleteRoom, getRoomListPage, openUpdateRoom, closeUpdateRoom, updateRoom, fetchMoreRooms } from "./roomActions";
import { connect } from "react-redux";
import { isLogged } from '../Auth/authService';
import UpdateRoom from './UpdateRoom';

class RoomContainer extends Component {

    componentDidMount() {
        this.props.getRoomListPage(0);
    }

    render() {
        const { roomState, createRoom, deleteRoom, getRoomListPage, openUpdateRoom, closeUpdateRoom, updateRoom, fetchMoreRooms, history } = this.props;
        const { roomListPage, pageNumber, totalPages, updateRoomState, last } = roomState;

        const logged = isLogged();

        if (!logged) {
            history.push("/connexion")
        }

        return (
            <div>
                <RoomList totalPages={totalPages} roomListPage={roomListPage} getRoomListPage={getRoomListPage} pageNumber={pageNumber} deleteRoom={deleteRoom} openUpdateRoom={openUpdateRoom} fetchMoreRooms={fetchMoreRooms} last={last} />
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
    fetchMoreRooms: (pageNumber) => dispatch(fetchMoreRooms(pageNumber)),
    openUpdateRoom: (room) => dispatch(openUpdateRoom(room)),
    closeUpdateRoom: () => dispatch(closeUpdateRoom()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomContainer);