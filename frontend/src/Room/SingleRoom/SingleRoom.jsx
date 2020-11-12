import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import MessageList from "../../Message/MessageList";

const singleRoomStyles = makeStyles((theme) => ({
	section1: {
		margin: theme.spacing(3, 2),
	},
	section2: {
		margin: theme.spacing(2),
	},
	section3: {
		margin: theme.spacing(3, 1, 1),
	},
	paper: {
		padding: 24
	},
	messagesTitle: {
		marginTop: theme.spacing(4)
	},
	noMessageText: {
		marginTop: theme.spacing(2)
	}
}));

const SingleRoom = ({ singleRoom, messages }) => {
	const classes = singleRoomStyles();

	return (
		<Fragment>
			<Paper elevation={12} className={classes.paper}>
				<div className={classes.section1}>
					<Typography component="h1" variant="h4">{singleRoom.name ? singleRoom.name : "Non trouvé"}</Typography>
					<Typography variant="body1" color="textSecondary">Animé par : {singleRoom.userUsername ? singleRoom.userUsername : "Non trouvé"}</Typography>
					<Typography variant="body1" color="textSecondary">Code : {singleRoom.code ? singleRoom.code : "Non trouvé"}</Typography>
				</div>
			</Paper>
			<div className={classes.section2}>
				<Typography variant="h5" className={classes.messagesTitle}>Messages</Typography>
				<MessageList messages={messages} />
			</div>
		</Fragment>
	)
}

export default SingleRoom;