import { makeStyles } from '@material-ui/core/styles';

const chatListStyles = makeStyles((theme) => ({
	ChatList: {
		width: '100%',
		backgroundColor: theme.palette.background.paper,
		margin: "30px 0",
		[`${theme.breakpoints.down('sm')}`]: {
            padding: "auto"
		},
		[`${theme.breakpoints.up('sm')}`]: {
            padding: 20
        },
	},
	title: {
		marginTop: 50,
		marginBottom: 50
	},
	noChat: {
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

export default chatListStyles;