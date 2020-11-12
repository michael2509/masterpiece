import React, { Fragment } from "react";
import Message from "./Message";
import { List, makeStyles, Typography } from "@material-ui/core";


const messageListStyle = makeStyles((theme) => ({
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
        <Fragment>
            {messages.length === 0 ? (<Typography variant="body1" className={classes.noMessageText}>Aucun messages pour le moment</Typography>) : (
                <Fragment>
                    <List>
                        {messages.map((message, i) => (
                            <Message key={i} author={message.author} message={message.message} />
                        ))}
                    </List>
                </Fragment>
            )}
        </Fragment>
    )
}

export default MessageList