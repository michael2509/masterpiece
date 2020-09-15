import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Divider, Button } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Pagination from '@material-ui/lab/Pagination';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	roomList: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		margin: "30px 0"
	},
	title: {
		marginBottom: 50
	},
	noRoom: {
		textAlign: "center"
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

const RoomList = (props) => {
	const classes = useStyles();
	const { roomListPage, deleteRoom, getRoomListPage, pageNumber, totalPages } = props;

	const deleteAndRefresh = (roomId) => {
		deleteRoom(roomId)
		.then(() => getRoomListPage(pageNumber));
	}

	console.log(roomListPage);

	return (
		<Fragment>
			<Typography className={classes.title} variant="h4" component="h2" align="center">Vos Salons</Typography>
			{!roomListPage || roomListPage.length === 0 ? <div className={classes.noRoom}><p>Vous n'avez pas encore de salons</p><p>Vous pouvez en créer avec le bouton en bas à droite</p></div> : (
				<Fragment>
					<List className={classes.roomList}>
						{roomListPage.map((room, i) => (
							<Fragment key={i}>
								<ListItem button>
									<ListItemAvatar>
										<Avatar>
											<MeetingRoomIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={room.name} secondary={`Code : ${room.code}`}/>
									<Button variant="outlined" color="secondary" onClick={() => deleteAndRefresh(room.id)}><DeleteIcon /></Button>
								</ListItem>
								{i < roomListPage.length - 1 ? <Divider variant="inset" component="li" /> : null}
							</Fragment>
						))}
					</List>
					<div className={classes.paginationContainer}>
						<Pagination page={pageNumber+1} count={totalPages} className={classes.pagination} onChange={(room, value) => getRoomListPage(value-1)} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}

export default RoomList;