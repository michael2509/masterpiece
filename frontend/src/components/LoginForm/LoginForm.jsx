import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';

const loginForm = props => {
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
                    <Typography variant="h3" component="h2">Connexion</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField style={{ marginTop: 30 }}
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
                        <TextField style={{ marginTop: 30 }}
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
                        <Button variant="contained" color="primary" style={{ marginTop: 80 }} fullWidth>Créer</Button>
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

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .required("Entrez votre identifiant"),
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
    }),

    handleSubmit: (values, { resetForm }) => {
        const user = JSON.stringify(values);
        console.log(user);

        axios.post('http://localhost:8081/users', user, { headers: { 'Content-Type': 'application/json' } })
            .then(response => console.log(response))
            .catch(error => console.log(error));
        resetForm();
    }
})(loginForm);

export default LoginForm;