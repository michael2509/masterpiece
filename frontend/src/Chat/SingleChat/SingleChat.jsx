import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const SingleChatStyles = makeStyles((theme) => ({
	section1: {
		margin: theme.spacing(3, 2),
	},
	paper: {
		padding: 24
	}
}));

const SingleChat = ({ SingleChat }) => {
	const classes = SingleChatStyles();

	return (
		<Paper elevation={12} className={classes.paper}>
			<div className={classes.section1}>
				<Typography component="h1" variant="h4">{SingleChat.name ? SingleChat.name : "Non trouvé"}</Typography>
				<Typography variant="body1" color="textSecondary">Animé par : {SingleChat.speakerUsername ? SingleChat.speakerUsername : "Non trouvé"}</Typography>
				<Typography variant="body1" color="textSecondary">Code : {SingleChat.accessCode ? SingleChat.accessCode : "Non trouvé"}</Typography>
			</div>
		</Paper>
	)
}

export default SingleChat;