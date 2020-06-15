import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import label from '../../configs/label';
import { withFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import errorType from '../../error-type/errorType';
import { withTheme } from '@material-ui/core/styles';
import Notification from '../Notification/Notification';
import { Card, CardContent } from '@material-ui/core';
import zenasklogo from '../../assets/img/zenask-logo.png';
import { Link as RouterLink } from 'react-router-dom';

const signupFormChild = props => {
    const {
        values,
        touched,
        errors,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        theme
    } = props;


    const classes = {
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
        },
        avatar: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(1),
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: theme.palette.secondary.main
        },
        form: {
            width: '100%', // Fix IE 11 issue.
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        card: {
            width: "100%",
            borderRadius: 10
        },
        cardContent: {
            width: "90%",
            margin: "0 auto"
        },
        title: {
            marginBottom: theme.spacing(3)
        },
        zenaskLogo: {
            maxHeight: 100
        }
    };

    return (
        <div className="auth-bg">
            <Container component="main" maxWidth="xs" className="auth-container">
                <CssBaseline />
                <div style={classes.paper}>
                    <RouterLink to={"/"}>
                        <Link component="span">
                            <img style={classes.zenaskLogo} src={zenasklogo} alt="Zenask logo" />
                        </Link>
                    </RouterLink>
                    <Card style={classes.card}>
                        <CardContent style={classes.cardContent}>
                            <Avatar style={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography style={classes.title} component="h1" variant="h5">
                                Inscription
                    </Typography>
                            <form style={classes.form} onSubmit={handleSubmit} noValidate>
                                <TextField
                                    id="username"
                                    label={label.identifiant}
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.username ? errors.username : ""}
                                    error={touched.username && Boolean(errors.username)}
                                    variant="outlined"
                                    margin="normal"
                                    autoFocus
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    id="email"
                                    label={label.email}
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.email ? errors.email : ""}
                                    error={touched.email && Boolean(errors.email)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    id="password"
                                    label={label.mdp}
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.password ? errors.password : ""}
                                    error={touched.password && Boolean(errors.password)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    id="confirmPassword"
                                    label={label.confirmationMdp}
                                    type="password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                />
                                {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    style={classes.submit}
                                >
                                    S'inscrire
                                </Button>

                                {status ? <Notification message={status.message} severity={status.severity} /> : null}
                            </form>
                            <RouterLink to={"/connexion"}>
                                <Link component="span" variant="body2">Vous avez déjà un compte? Connectez-vous</Link>
                            </RouterLink>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </div>
    );
}

const signupForm = withTheme(signupFormChild);

const SignupForm = withFormik({
    mapPropsToValues: ({
        username,
        email,
        password,
        confirmPassword,
    }) => {
        return {
            username: username || "",
            email: email || "",
            password: password || "",
            confirmPassword: confirmPassword || "",
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required("Entrez votre identifiant"),
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.:;?|/\\{}<>!@#$%^&*()_+-=])(?=.{8,})/, "Votre mot de passe doit contenir au moins 8 caractères, 1 lettre majuscule, 1 lettre minuscule, 1 caractère spécial, et 1 chiffre")
            .required("Entrez votre mot de passe"),
        confirmPassword: Yup.string()
            .required("Confirmez votre mot de passe")
            .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas")
    }),

    handleSubmit: (values, { resetForm, setStatus }) => {
        
        const user = Object.assign({}, values)
        delete user.confirmPassword
        const userJson = JSON.stringify(values);
        console.log(userJson);

        axios.post('http://localhost:8081/users', userJson, { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                console.log(response);
                setStatus({ message: "Compte crée avec succès !", severity: "success" });
                resetForm();
            })
            .catch(error => {
                console.log(error.response);
                const snackerr = errorType(error.response);
                setStatus({ message: snackerr, severity: "error" });
            });
    }
})(signupForm);

export default SignupForm;