import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MeetingRoom } from '@material-ui/icons';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import homeStyles from './homeStyles';
import { getSingleRoom } from '../Room/SingleRoom/singleRoomActions';

function HomeContent(props) {
	const classes = homeStyles();

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

	handleSubmit: (values, { props }) => {
		const code = values.code;
		const { getSingleRoom, history } = props;

		getSingleRoom(code)
			.then((roomFound) => roomFound ? history.push(`/salons/${code}`) : null)
	}
})(HomeContent);

const mapStateToProps = (state) => ({ navbar: state.navbar })

const mapDispatchToProps = (dispatch) => ({
	getSingleRoom: (code) => dispatch(getSingleRoom(code))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);