import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MeetingRoom } from '@material-ui/icons';
import BackgroundImg from '../global/assets/img/audience.png';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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

function HomeContent(props) {
	const classes = useStyles();

	const {
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		navbar
	} = props;

	return (
		<Grid container className={classes.grid} component="main" style={{ minHeight: `calc(100vh - ${navbar.height}px)`, marginTop: navbar.height}} >
			<Grid item xs={12} sm={12} md={7} className={`${classes.image} ${classes.gridItem}`} >
				<div className={classes.leftContainer}>
					<Typography component="h2" variant="h4" >Application d'aide pour vos conférences</Typography>
					<Typography component="h3" variant="h5" className={classes.leftSecondTitle} >Commencez à créer vos salons pour vos conférences en créant un compte ou en vous connectant</Typography>
					<Link to="/inscription">
						<Button size='large' className={classes.leftButton} variant="contained" color="primary" startIcon={<PersonAddIcon />}>Créer un compte</Button>
					</Link>
					<span className={classes.or}>ou</span>
					<Link to="/connexion">
						<Button size='large' className={classes.leftButton} variant="contained" color="primary" startIcon={<AccountCircleIcon />}>Se connecter</Button>
					</Link>
				</div>
			</Grid>
			<Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} className={classes.gridItem} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<MeetingRoom className={classes.meetingRoom} />
					</Avatar>
					<Typography component="h2" variant="h4" gutterBottom>Rejoignez un salon</Typography>
					<Typography component="h3" variant="h6">Accessible sans compte</Typography>
					<form className={classes.form} onSubmit={handleSubmit} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="code"
							label="code du salon"
							name="code"
							autoComplete="code"
							autoFocus
							value={values.code}
							onChange={handleChange}
							onBlur={handleBlur}
							error={touched.code && Boolean(errors.code)}
							helperText={touched.code ? errors.code : ""}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							endIcon={<ArrowForwardIcon />}
						>
							Rejoindre
						</Button>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

const Home = withFormik({
	mapPropsToValues: ({
		code
	}) => {
		return {
			code: code || ""
		};
	},

	validationSchema: Yup.object().shape({
		code: Yup.string()
			.max(10, "Le code ne peut pas excéder 10 caractères")
			.required("Entrez le code du salon")
	}),

	handleSubmit: (values, { props, resetForm }) => {
		console.log(values);
	}
})(HomeContent);

const mapStateToProps = (state) => ({ navbar: state.navbar })

export default connect(mapStateToProps)(Home);