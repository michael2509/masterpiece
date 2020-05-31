import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
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
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={classes.paper}>
        <Avatar style={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/connexion" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
            {status ? <Notification message={status.message} severity={status.severity}/>: null}
          </Grid>
        </form>
      </div>
    </Container>
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
    delete values.confirmPassword;
    const user = JSON.stringify(values);
    console.log(user);

    axios.post('http://localhost:8081/users', user, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log(response);
        setStatus({ message: "Compte crée avec succès !", severity: "success" });
      })
      .catch(error => {
        console.log(error.response);
        const snackerr = errorType(error.response);
        setStatus({ message: snackerr, severity: "error" });
      });
    resetForm();
  }
})(signupForm);

export default SignupForm;