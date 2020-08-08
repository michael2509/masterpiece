import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Divider } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { format } from 'date-fns'
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
	meetingList: {
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

const MeetingList = (props) => {
	const classes = useStyles();
	const { meetingListPage, getMeetingListPage } = props;

	return (
		<Fragment>
			{!meetingListPage ? <p>Chargement...</p> : (
				<Fragment>
					<Typography variant="h5" component="h2" align="center" gutterBottom>Vos Meetings</Typography>
					<List className={classes.meetingList}>
						{meetingListPage.content.map((meeting, i) => (
							<Fragment key={i}>
								<ListItem button>
									<ListItemAvatar>
										<Avatar>
											<MeetingRoomIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={meeting.name} secondary={<span><span>Début : {format(new Date(meeting.startDateTime), "dd/MM/yyyy à HH:mm")}</span><br></br><span>Fin : {format(new Date(meeting.endDateTime), "dd/MM/yyyy à HH:mm")}</span><br></br><span>Code d'accès : #{meeting.code}</span></span>} />
								</ListItem>
								{i < meetingListPage.content.length - 1 ? <Divider variant="inset" component="li" /> : null}
							</Fragment>
						))}
					</List>
					<div className={classes.paginationContainer}>
						<Pagination page={meetingListPage.number+1} count={meetingListPage.totalPages} className={classes.pagination} onChange={(meeting, value) => getMeetingListPage(value-1)} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}

export default MeetingList;