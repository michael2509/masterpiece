import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

export default function Message({ author, message }) {
	return (
		<ListItem disableGutters>
			<ListItemAvatar>
				<Avatar>
					{author.toUpperCase()[0]}
				</Avatar>
			</ListItemAvatar>
			<ListItemText primary={author} secondary={message} />
		</ListItem>
	);
}