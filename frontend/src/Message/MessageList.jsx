import React, { Fragment } from "react";
import Message from "./Message";
import { List, makeStyles, Typography } from "@material-ui/core";


const messageListStyle = makeStyles((theme) => ({
	messageSection: {
		margin: theme.spacing(2),
	},
	messagesTitle: {
		marginTop: theme.spacing(4)
	},
	noMessageText: {
		marginTop: theme.spacing(2)
	}
}));

const MessageList = ({ messages }) => {
    const classes = messageListStyle();

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