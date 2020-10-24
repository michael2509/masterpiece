import { makeStyles } from '@material-ui/core/styles';
import BackgroundImg from '../global/assets/img/audience.png';

const homeStyles = makeStyles((theme) => ({
	grid: {
		display: "flex",
		alignSelf: "center",
		[`${theme.breakpoints.down('sm')}`]: {
			height: 'auto',
		}
	},
	image: {
		backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${BackgroundImg});`,
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(3, 0),
		backgroundColor: theme.palette.primary.main,
		height: 52,
		width: 52
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	meetingRoom: {
		height: 28,
		width: 28
	},
	gridItem: {
		display: "flex", alignItems: "center", justifyContent: "center"
	},
	leftContainer: {
		width: "80%",
		color: "white",
		textShadow: "2px 2px 2px #000"
	},
	leftSecondTitle: {
		marginTop: 30,
		marginBottom: 30
	},
	or: {
		margin: "0 20px",
		textShadow: "2px 2px 2px #000"
	},
	leftButton: {
		margin: "15px 0"
	}
}));

export default homeStyles;