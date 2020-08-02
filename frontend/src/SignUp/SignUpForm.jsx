import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import label from '../global/configs/label';
import { withFormik } from "formik";
import * as Yup from "yup";
import { withTheme } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import zenasklogo from '../global/assets/img/zenask-logo.png';
import { Link as RouterLink, withRouter } from 'react-router-dom';

const signUpFormChild = props => {
    const {
        values,
        touched,
        errors,
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
                            size="small"
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
                            size="small"
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
                            size="small"
                            required
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={classes.submit}
                        >
                            S'inscrire
                        </Button>

                    </form>
                    <RouterLink to={"/connexion"}>
                        <Link component="span" variant="body2">Vous avez déjà un compte? Connectez-vous</Link>
                    </RouterLink>
                </CardContent>
            </Card>
        </div>
    );
}

const signUpForm = withTheme(signUpFormChild);

const SignUpForm = withFormik({
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
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.:;?|/\\{}<>!@#$%^&*()_+-=])(?=.{8,})/, <ul><li>test</li></ul>)
            .required("Entrez votre mot de passe"),
        confirmPassword: Yup.string()
            .required("Confirmez votre mot de passe")
            .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas")
    }),

    handleSubmit: (values, { props, resetForm }) => {
        
        const { createAccount, history } = props
        const user = Object.assign({}, values)
        delete user.confirmPassword
        
        createAccount(user).then(requestSuccess => {
            if (requestSuccess) {
                resetForm()
                history.push("/connexion")
            }
        })

    }
})(signUpForm);

export default withRouter(SignUpForm);