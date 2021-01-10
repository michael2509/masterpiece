import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

export default function Message({ username, message }) {
	return (
		<ListItem disableGutters>
			<ListItemAvatar>
				<Avatar>
					{username.toUpperCase()[0]}
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={username} secondary={message} />
		</ListItem>
	);
}