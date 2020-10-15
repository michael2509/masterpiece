import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Hidden, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Room from './Room';
import InfiniteScroll from 'react-infinite-scroll-component';

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
	const { roomListPage, deleteRoom, getRoomListPage, openUpdateRoom, fetchMoreRooms, pageNumber, totalPages, last } = props;

	return (
		<Fragment>
			<Typography className={classes.title} variant="h4" component="h2" align="center">Vos Salons</Typography>
			{!roomListPage || roomListPage.length === 0 ? <div className={classes.noRoom}><p>Vous n'avez pas encore de salons</p><p>Vous pouvez en créer avec le bouton en bas à droite</p></div> : (
				<Fragment>
					<Hidden xsDown>
						<List className={classes.roomList}>
							{roomListPage.map((room, i) => (
								<Room key={i} openUpdateRoom={openUpdateRoom} deleteRoom={deleteRoom} room={room} getRoomListPage={getRoomListPage} />
							))}
						</List>
						{totalPages > 1 ? (
							<div className={classes.paginationContainer}>
								<Pagination page={pageNumber+1} count={totalPages} className={classes.pagination} onChange={(room, value) => getRoomListPage(value-1)} />
							</div>
						) : null}
					</Hidden>
					<Hidden smUp>
						<InfiniteScroll
							dataLength={roomListPage.length}
							next={!last ? () => fetchMoreRooms(pageNumber + 1) : console.log("already in last page")}
							hasMore={true}
							loader={!last ? <p>Chargement...</p> : null}
							>
							<List className={classes.roomList}>
								{roomListPage.map((room, i) => (
									<Room key={i} openUpdateRoom={openUpdateRoom} deleteRoom={deleteRoom} room={room} getRoomListPage={getRoomListPage} />
								))}
							</List>
						</InfiniteScroll>
					</Hidden>
				</Fragment>
			)}
		</Fragment>
	);
}

export default RoomList;