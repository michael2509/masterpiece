import React, { Fragment } from 'react';
import List from '@material-ui/core/List';
import { Hidden, Paper, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChatItem from './ChatItem';
import chatListStyles from './chatListStyles';

// Chat list component
const ChatList = (props) => {
	const classes = chatListStyles();
	const { chatPage, deleteChat, getChatPage, openUpdateChat, fetchMoreChats, pageNumber, totalPages, last } = props;

	return (
		<Fragment>
			<Typography className={classes.title} variant="h4" component="h2" align="center">Vos chats</Typography>
			{!chatPage || chatPage.length === 0 ? <div className={classes.noChat}><p>Vous n'avez pas encore de chats</p><p>Vous pouvez en créer avec le bouton en bas à droite</p></div> : (
				<Fragment>
					<Hidden xsDown>
						<Paper elevation={3}>
							<List className={classes.ChatList}>
								{chatPage.map((chat, i) => (
									<ChatItem key={i} openUpdateChat={openUpdateChat} deleteChat={deleteChat} chat={chat} getChatPage={getChatPage} />
								))}
							</List>
						</Paper>
							{totalPages > 1 ? (
								<div className={classes.paginationContainer}>
									<Pagination page={pageNumber+1} count={totalPages} className={classes.pagination} onChange={(chat, value) => getChatPage(value-1)} />
								</div>
							) : null}
					</Hidden>
					<Hidden smUp>
						<InfiniteScroll
							dataLength={chatPage.length}
							next={!last ? () => fetchMoreChats(pageNumber + 1) : console.log("already in last page")}
							hasMore={true}
							>
							<Paper elevation={3}>
							<List className={classes.ChatList}>
								{chatPage.map((chat, i) => (
									<ChatItem key={i} openUpdateChat={openUpdateChat} deleteChat={deleteChat} chat={chat} getChatPage={getChatPage} />
								))}
							</List>
							</Paper>
						</InfiniteScroll>
					</Hidden>
				</Fragment>
			)}
		</Fragment>
	);
}

export default ChatList;