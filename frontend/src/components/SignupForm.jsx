import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

const SignupForm = props => {
    const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
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

            <Grid item xs={3}>
                <div>
                    <Typography variant="h3" component="h2">Créer votre compte</Typography>
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardContent>
                                <TextField
                                    id="username"
                                    label="Identifiant"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    helperText={touched.username ? errors.username : ""}
                                    error={touched.username && Boolean(errors.username)}
                                    margin="dense"
                                    variant="outlined"
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
                                    variant="outlined"
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
                                    variant="outlined"
                                    fullWidth
                                />
                            </CardContent>
                            <CardActions>
                                <Button type="submit" color="primary" disabled={isSubmitting}>Créer</Button>
                                <Button color="secondary" onClick={handleReset}>Réinitialiser</Button>
                            </CardActions>
                        </Card>
                    </form>
                </div>
            </Grid>

        </Grid>
    );
};

const ValidatedSignupForm = withFormik({
    mapPropsToValues: ({
        username,
        password,
        confirmPassword
    }) => {
        return {
            username: username || "",
            password: password || "",
            confirmPassword: confirmPassword || "",
        };
    },

    validationSchema: Yup.object().shape({
        username: Yup.string()
            .max(255, "Votre identifiant ne doit pas dépasser 255 characters")
            .required("Entrez votre identifiant"),
        password: Yup.string()
            .min(8, "Votre mot de passe doit contenir au moins 8 characters")
            .max(255, "Votre mot de passe ne doit pas dépasser 255 characters")
            .required("Entrez votre mot de passe"),
        confirmPassword: Yup.string()
            .required("Confirmez votre mot de passe")
            .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas")
    }),

    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            // submit to the server
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    }
})(SignupForm);

export default ValidatedSignupForm;