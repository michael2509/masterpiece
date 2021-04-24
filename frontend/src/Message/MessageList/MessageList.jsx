import React, { Fragment } from "react";
import Message from "../Message";
import { List, Typography } from "@material-ui/core";
import messageListStyles from './messageListStyles';

const MessageList = ({ messages }) => {
    const classes = messageListStyles();

    return (
        <div className={classes.messageSection}>
			<Typography variant="h5" className={classes.messagesTitle}>Messages</Typography>
            {messages.length === 0 ? (<Typography variant="body1" className={classes.noMessageText}>Aucun messages pour le moment</Typography>) : (
                <Fragment>
                    <List>
                        {messages.map((message, i) => (
                            <Message key={i} senderName={message.senderName} text={message.text} />
                            ))}
                    </List>
                </Fragment>
            )}
        </div>
    )
}

export default MessageList