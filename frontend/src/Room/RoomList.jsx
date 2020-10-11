import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Room from './Room';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchRoomList } from './roomActions';
import CircularProgress from '@material-ui/core/CircularProgress';

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
	const { roomListPage, deleteRoom, getRoomListPage, openUpdateRoom, fetchMoreRooms, pageNumber, totalPages } = props;

	console.log(roomListPage);

	return (
		<Fragment>
			<Typography className={classes.title} variant="h4" component="h2" align="center">Vos Salons</Typography>
			{!roomListPage || roomListPage.length === 0 ? <div className={classes.noRoom}><p>Vous n'avez pas encore de salons</p><p>Vous pouvez en créer avec le bouton en bas à droite</p></div> : (
				<Fragment>
					{/* <List className={classes.roomList}>
						{roomListPage.map((room, i) => (
							<Room key={i} openUpdateRoom={openUpdateRoom} deleteRoom={deleteRoom} room={room} getRoomListPage={getRoomListPage} />
						))}
					</List>
					{totalPages > 1 ? (
						<div className={classes.paginationContainer}>
							<Pagination page={pageNumber+1} count={totalPages} className={classes.pagination} onChange={(room, value) => getRoomListPage(value-1)} />
						</div>
					) : null} */}
					<InfiniteScroll
						dataLength={roomListPage.length}
						next={() => fetchMoreRooms(pageNumber + 1)}
						hasMore={true}
						>
						<List className={classes.roomList}>
							{roomListPage.map((room, i) => (
								<Room key={i} openUpdateRoom={openUpdateRoom} deleteRoom={deleteRoom} room={room} getRoomListPage={getRoomListPage} />
							))}
						</List>
					</InfiniteScroll>
				</Fragment>
			)}
		</Fragment>
	);
}

export default RoomList;