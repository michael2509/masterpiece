import React, { Fragment } from "react";
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    authContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: "100%",
        justifyContent: 'center',
        [`${theme.breakpoints.down('sm')}`]: {
            minHeight: "100vh !important"
        },
        [`${theme.breakpoints.down('sm')} and (orientation: landscape)`]: {
            height: "auto !important"
		}
    }
}));

const AuthContainer = ({ children, maxWidth, navbarHeight }) => {
    const classes = useStyles();

    return (
        <Fragment>
            <div style={{ height: navbarHeight }}></div>
            <Container component="main" maxWidth={maxWidth} className={classes.authContainer} style={{ height: `calc(100vh - ${navbarHeight}px)` }}>
                {children}
            </Container>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({ navbarHeight: state.navbar.height })

export default connect(mapStateToProps)(AuthContainer);