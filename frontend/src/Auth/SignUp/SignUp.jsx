import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import label from '../../global/configs/label';
import { withFormik } from "formik";
import * as Yup from "yup";
import { Paper } from '@material-ui/core';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import signUpStyles from './signUpStyles';

// Signup form component
const signUpForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = props;

    const classes = signUpStyles()

    return (
        <Paper className={classes.paper} elevation={5}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography className={classes.title} component="h1" variant="h5">
                Inscription
                    </Typography>
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
                <TextField
                    id="username"
                    label={label.username}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username ? errors.username : ""}
                    error={touched.username && Boolean(errors.username)}
                    variant="outlined"
                    margin="normal"
                    autoFocus
                    fullWidth
                    required
                />
                <TextField
                    id="password"
                    label={label.password}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                />
                <TextField
                    id="confirmPassword"
                    label={label.confirmPassword}
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                >
                    S'inscrire
                        </Button>

            </form>
            <RouterLink to={"/connexion"}>
                <Link component="span" variant="body2">Vous avez déjà un compte? Connectez-vous</Link>
            </RouterLink>
        </Paper>
    );
}

// Signup form component with formik validation
const SignUp = withFormik({
    mapPropsToValues: ({
        username,
        password,
        confirmPassword,
    }) => {
        return {
            username: username || "",
            password: password || "",
            confirmPassword: confirmPassword || "",
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required("Entrez votre identifiant"),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.:;?|/\\{}<>!@#$%^&*()_+-=])(?=.{8,})/, "Doit contenir au moins 8 caractères, 1 minuscule, 1 majuscule, 1 chiffres, 1 caractère spécial")
            .required("Entrez votre mot de passe"),
        confirmPassword: Yup.string()
            .required("Confirmez votre mot de passe")
            .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas")
    }),

    handleSubmit: (values, { props, resetForm }) => {

        const { createSpeaker, history } = props
        const speaker = Object.assign({}, values)
        delete speaker.confirmPassword

        createSpeaker(speaker).then(requestSuccess => {
            if (requestSuccess) {
                resetForm()
                history.push("/connexion")
            }
        })

    }
})(signUpForm);

export default withRouter(SignUp);