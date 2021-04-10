import { makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";

const singleRoomStyles = makeStyles((theme) => ({
	section1: {
		margin: theme.spacing(3, 2),
	},
	paper: {
		padding: 24
	}
}));

const SingleRoom = ({ singleRoom }) => {
	const classes = singleRoomStyles();

	return (
		<Paper elevation={12} className={classes.paper}>
			<div className={classes.section1}>
				<Typography component="h1" variant="h4">{singleRoom.name ? singleRoom.name : "Non trouvé"}</Typography>
				<Typography variant="body1" color="textSecondary">Animé par : {singleRoom.speakerUsername ? singleRoom.speakerUsername : "Non trouvé"}</Typography>
				<Typography variant="body1" color="textSecondary">Code : {singleRoom.accessCode ? singleRoom.accessCode : "Non trouvé"}</Typography>
			</div>
		</Paper>
	)
}

export default SingleRoom;