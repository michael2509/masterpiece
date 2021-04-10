import React, { Fragment } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from "react-router-dom";
import { ListItemIcon, ListItemSecondaryAction, Menu, MenuItem, Typography } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const RoomItem = ({ room, openUpdateRoom, deleteRoom }) => {
    const [menuEl, setMenuEl] = React.useState(null);

    const handleClick = (event) => {
        setMenuEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuEl(null);
    };

    const updateRoomClick = (room) => {
        openUpdateRoom(room);
        handleClose();
    }

    const deleteRoomClick = (roomId) => {
        deleteRoom(roomId);
        handleClose();
    }

    const styles = {
        link: {
            display: "inherit",
            alignItems: "inherit",
            color: 'inherit',
            textDecoration: 'inherit',
            width: "inherit"
        }
    }

    return (
        <Fragment>
            <ListItem button>
                <Link to={{
                    pathname: `/salons/${room.id}`,
                    state: {
                      roomId: room.id
                    }}}
                style={styles.link}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <MeetingRoomIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={room.name} secondary={`Code : ${room.accessCode}`} />
                </Link>
                <ListItemSecondaryAction>
                    <IconButton onClick={handleClick}>
                        <MoreVert />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Menu open={Boolean(menuEl)} onClose={handleClose} anchorEl={menuEl} keepMounted>
                <MenuItem onClick={() => updateRoomClick(room)}>
                    <ListItemIcon aria-label="edit">
                        <EditIcon />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>Éditer</Typography>
                </MenuItem>
                <MenuItem onClick={() => deleteRoomClick(room.id)}>
                    <ListItemIcon aria-label="delete">
                        <DeleteIcon />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>Supprimer</Typography>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default RoomItem;