import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CardContent } from '@material-ui/core';
import zenasklogo from '../../assets/img/zenask-logo.png';

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
    zenaskLogo: {
        maxHeight: 100
    }
}));

export default function LoginForm() {
    const classes = useStyles();

    return (
        <div className="auth-bg">
            <Container component="main" maxWidth="xs" className="auth-container">
                <CssBaseline />
                <div className={classes.paper}>
                    <img className={classes.zenaskLogo} src={zenasklogo} alt="Zenask logo" />
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                Se Connecter
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    size="small"
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
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
                                    className={classes.submit}
                                >
                                    Connexion
          </Button>
                                <Grid container>
                                    {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
                                    <Grid item>
                                        <Link href="/inscription" variant="body2">
                                            {"Pas de compte ? Inscrivez vous"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Container>
        </div>
    );
}