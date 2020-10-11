import React, { Fragment } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const Room = ({ room, openUpdateRoom, deleteRoom }) => {

    return (
        <Fragment>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar>
                        <MeetingRoomIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={room.name} secondary={`Code : ${room.code}`}/>
                <IconButton onClick={() => openUpdateRoom(room)} aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteRoom(room.id)} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </ListItem>
        </Fragment>
    )
}

export default Room