import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import Notification from '../Notification/Notification';
import label from '../../configs/label';
import errorType from '../../error-type/errorType';

class signupForm extends React.Component {

    render() {
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
                        <form onSubmit={this.props.handleSubmit}>
                            <TextField
                                id="username"
                                label={label.identifiant}
                                value={this.props.values.username}
                                onChange={this.props.handleChange}
                                onBlur={this.props.handleBlur}
                                helperText={this.props.touched.username ? this.props.errors.username : ""}
                                error={this.props.touched.username && Boolean(this.props.errors.username)}
                                margin="dense"
                                fullWidth
                            />
                            <TextField
                                id="email"
                                label={label.email}
                                value={this.props.values.email}
                                onChange={this.props.handleChange}
                                onBlur={this.props.handleBlur}
                                helperText={this.props.touched.email ? this.props.errors.email : ""}
                                error={this.props.touched.email && Boolean(this.props.errors.email)}
                                margin="dense"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                label={label.mdp}
                                type="password"
                                value={this.props.values.password}
                                onChange={this.props.handleChange}
                                onBlur={this.props.handleBlur}
                                helperText={this.props.touched.password ? this.props.errors.password : ""}
                                error={this.props.touched.password && Boolean(this.props.errors.password)}
                                margin="dense"
                                fullWidth
                            />
                            <TextField
                                id="confirmPassword"
                                label={label.confirmationMdp}
                                type="password"
                                value={this.props.values.confirmPassword}
                                onChange={this.props.handleChange}
                                onBlur={this.props.handleBlur}
                                helperText={this.props.touched.confirmPassword ? this.props.errors.confirmPassword : ""}
                                error={this.props.touched.confirmPassword && Boolean(this.props.errors.confirmPassword)}
                                margin="dense"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" style={{ marginTop: 60 }} fullWidth>Créer</Button>
                            {/* <CardActions>
                                <Button type="submit" color="primary" disabled={isSubmitting}>Créer</Button>
                                <Button color="secondary" onClick={handleReset}>Réinitialiser</Button>
                            </CardActions> */}
                        </form>
                    </div>
                </Grid>
                {this.props.status ? <Notification message={this.props.status} /> : null}
            </Grid>
        );
    }
};

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
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Votre mot de passe doit contenir au moins 8 caractères, 1 lettre majuscule, 1 lettre minuscule, 1 caractère spécial, et 1 chiffre")
            .required("Entrez votre mot de passe"),
        confirmPassword: Yup.string()
            .required("Confirmez votre mot de passe")
            .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas")
    }),

    handleSubmit: (values, { resetForm, setStatus}) => {
        delete values.confirmPassword;
        const user = JSON.stringify(values);
        console.log(user);

        axios.post('http://localhost:8081/users', user, { headers: { 'Content-Type': 'application/json' } })
            .then(response => console.log(response))
            .catch(error => {
                console.log(error.response);
                const snackerr = errorType(error.response);
                setStatus(snackerr);
            });
        resetForm();
    }
})(signupForm);

export default SignupForm;