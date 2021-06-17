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

// Chat item component
const ChatItem = ({ chat, openUpdateChat, deleteChat }) => {
    const [menuEl, setMenuEl] = React.useState(null);

    const handleClick = (event) => {
        setMenuEl(event.currentTarget);
    };

    const handleClose = () => {
        setMenuEl(null);
    };

    const updateChatClick = (chat) => {
        openUpdateChat(chat);
        handleClose();
    }

    const deleteChatClick = (chatId) => {
        deleteChat(chatId);
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
                    pathname: `/chats/${chat.id}`,
                    state: {
                      chatId: chat.id
                    }}}
                style={styles.link}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <MeetingRoomIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={chat.name} secondary={`Code : ${chat.accessCode}`} />
                </Link>
                <ListItemSecondaryAction>
                    <IconButton onClick={handleClick}>
                        <MoreVert />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Menu open={Boolean(menuEl)} onClose={handleClose} anchorEl={menuEl} keepMounted>
                <MenuItem onClick={() => updateChatClick(chat)}>
                    <ListItemIcon aria-label="edit">
                        <EditIcon />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>Éditer</Typography>
                </MenuItem>
                <MenuItem onClick={() => deleteChatClick(chat.id)}>
                    <ListItemIcon aria-label="delete">
                        <DeleteIcon />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>Supprimer</Typography>
                </MenuItem>
            </Menu>
        </Fragment>
    )
}

export default ChatItem;