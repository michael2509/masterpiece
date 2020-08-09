import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import eMeetingLogo from '../../global/assets/img/e-meeting-logo.png';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { withFormik } from "formik";
import label from '../../global/configs/label';
import { login } from '../authService';

const useStyles = makeStyles(theme => ({
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
    eMeetingLogo: {
        maxHeight: 40,
        marginBottom: 20
    }
}));

function LoginFormChild(props) {
    const classes = useStyles();

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = props;
    return (
        <div className={classes.paper}>
            <RouterLink to={"/"}>
                <Link component="span">
                    <img className={classes.eMeetingLogo} src={eMeetingLogo} alt="E-Meeting logo" />
                </Link>
            </RouterLink>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
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
                            size="small"
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
                            size="small"
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
                        >
                            Connexion
                        </Button>
                    </form>
                    <RouterLink to={"/inscription"}>
                        <Link component="span" variant="body2">Pas de compte ? Inscrivez vous</Link>
                    </RouterLink>
                </CardContent>
            </Card>
        </div>
    );
}

const LoginForm = withFormik({
    mapPropsToValues: ({
      username,
      password
    }) => {
      return {
        username: username || "",
        password: password || "",
      };
    },
  
    handleSubmit: (values, { props, resetForm }) => {
        const { history } = props

        const username = values.username
        const password = values.password

        login(username, password).then(logged => {
            if (logged) {
                resetForm();
                history.push("/meetings");
            }
        })
    }
  })(LoginFormChild);

  export default LoginForm;