import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { Typography } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { roundToNearestMinutes, format } from 'date-fns'

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
}));

const EventList = (props) => {
	const classes = useStyles();
	const { events } = props;
	const { eventListPage } = events;
	console.log(events);

	return (
		<Fragment>
			{!eventListPage ? <p>Chargement...</p> : (
				<Fragment>
					<Typography variant="h5" component="h2" align="center" gutterBottom>Vos Evenements</Typography>
					<List className={classes.root}>
						{eventListPage.content.map((event, i) => (
							<ListItem button key={i}>
								<ListItemAvatar>
									<Avatar>
										<MeetingRoomIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={event.name} secondary={<span><span>Début : {format(new Date(event.startDateTime), "dd/MM/yyyy à HH:mm")}</span><br></br><span>Fin : {format(new Date(event.endDateTime), "dd/MM/yyyy à HH:mm")}</span></span>} />
							</ListItem>
						))}
					</List>
				</Fragment>
			)}
		</Fragment>
	);
}

export default EventList;