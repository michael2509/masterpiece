import { makeStyles } from "@material-ui/core";

const messageListStyles = makeStyles((theme) => ({
	messageSection: {
		margin: theme.spacing(2),
	},
	messagesTitle: {
		marginTop: theme.spacing(4)
	},
	noMessageText: {
		marginTop: theme.spacing(2)
	}
}));

export default messageListStyles;