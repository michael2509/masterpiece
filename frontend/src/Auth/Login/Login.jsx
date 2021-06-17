import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { withFormik } from "formik";
import label from '../../global/configs/label';
import { login } from "../authService";
import * as Yup from "yup";
import loginStyles from './loginStyles';

// Login form component
function LoginForm(props) {

    const classes = loginStyles();

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = props;

    return (
        <Paper className={classes.paper} elevation={5}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className={classes.title}>
                Se Connecter
                </Typography>
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label={label.username}
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username ? errors.username : ""}
                    error={touched.username && Boolean(errors.username)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label={label.password}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                >
                    Connexion
                    </Button>
            </form>
            <RouterLink to={"/inscription"}>
                <Link component="span" variant="body2">Pas de compte ? Inscrivez vous</Link>
            </RouterLink>
        </Paper>
    );
}

// Login form with formik validation
const Login = withFormik({
    mapPropsToValues: ({
        username,
        password
    }) => {
        return {
            username: username || "",
            password: password || "",
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required("Entrez votre identifiant"),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.:;?|/\\{}<>!@#$%^&*()_+-=])(?=.{8,})/, "Doit contenir au moins 8 caractères, 1 minuscule, 1 majuscule, 1 chiffres, 1 caractère spécial")
            .required("Entrez votre mot de passe")
    }),

    handleSubmit: (values, { props, resetForm }) => {
        const { history, openNotification } = props;

        const username = values.username
        const password = values.password

        login(username, password).then(logged => {
            if (logged) {
                resetForm();
                openNotification(`Bienvenue ${username}, vous êtes connecté`, "success")
                history.push("/chats");
            } else {
                openNotification("Informations de connexion invalides", "error")
            }
        })
    }
})(LoginForm);

export default withRouter(Login);