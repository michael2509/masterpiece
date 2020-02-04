import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';

const signupForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    } = props;

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={10} md={5}>
                <div>
                    <Typography variant="h3" component="h2">Créer votre compte</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            id="username"
                            label="Identifiant"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.username ? errors.username : ""}
                            error={touched.username && Boolean(errors.username)}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            id="email"
                            label="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.email ? errors.email : ""}
                            error={touched.email && Boolean(errors.email)}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Mot de Passe"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.password ? errors.password : ""}
                            error={touched.password && Boolean(errors.password)}
                            margin="dense"
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirmer le mot de passe"
                            type="password"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            margin="dense"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" style={{ marginTop: 60 }} fullWidth>Créer</Button>
                        {/* <CardActions>
                                <Button type="submit" color="primary" disabled={isSubmitting}>Créer</Button>
                                <Button color="secondary" onClick={handleReset}>Réinitialiser</Button>
                            </CardActions> */}
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

const SignupForm = withFormik({
    mapPropsToValues: ({
        username,
        email,
        password,
        confirmPassword
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
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                <div>
                    <p>Votre mot de passe doit contenir :</p>
                    <ul>
                        <li>8 caractères minimum</li>
                        <li>1 lettre minuscule</li>
                        <li>1 lettre majuscule</li>
                        <li>1 chiffre minimum</li>
                        <li>1 caractère spécial minimum</li>
                    </ul>
                </div>)
            .required("Entrez votre mot de passe"),
        confirmPassword: Yup.string()
            .required("Confirmez votre mot de passe")
            .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas")
    }),

    handleSubmit: (values, { resetForm }) => {
        delete values.confirmPassword;
        const user = JSON.stringify(values);
        console.log(user);

        axios.post('http://localhost:8081/users', user, { headers: { 'Content-Type': 'application/json' } })
            .then(response => console.log(response))
            .catch(error => console.log(error));
        resetForm();
    }
})(signupForm);

export default SignupForm;