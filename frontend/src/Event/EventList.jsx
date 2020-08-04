import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Typography } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { format } from 'date-fns'
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	eventList: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		margin: "30px 0"
	},
	paginationContainer: {
		display: "flex",
		alignItems: "center",
  		justifyContent: "center"
	},
	pagination: {
		display: "inline-flex",
		padding: 0,
		marginBottom: 30
	}
}));

const EventList = (props) => {
	const classes = useStyles();
	const { eventListPage, getEventListPage } = props;

	return (
		<Fragment>
			{!eventListPage ? <p>Chargement...</p> : (
				<Fragment>
					<Typography variant="h5" component="h2" align="center" gutterBottom>Vos Evenements</Typography>
					<List className={classes.eventList}>
						{eventListPage.content.map((event, i) => (
							<ListItem button key={i}>
								<ListItemAvatar>
									<Avatar>
										<MeetingRoomIcon />
									</Avatar>
								</ListItemAvatar>
						<ListItemText primary={event.name} secondary={<span><span>Début : {format(new Date(event.startDateTime), "dd/MM/yyyy à HH:mm")}</span><br></br><span>Fin : {format(new Date(event.endDateTime), "dd/MM/yyyy à HH:mm")}</span><br></br><span>Code d'accès : #{event.code}</span></span>} />
							</ListItem>
						))}
					</List>
					<div className={classes.paginationContainer}>
						<Pagination page={eventListPage.number+1} count={eventListPage.totalPages} className={classes.pagination} onChange={(event, value) => getEventListPage(value-1)} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}

export default EventList;