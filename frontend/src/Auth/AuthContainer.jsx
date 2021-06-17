import React, { Fragment } from "react";
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import authContainerStyles from './authContainerStyles';

// Auth container to connect to app state using redux
const AuthContainer = ({ children, maxWidth, navbarHeight }) => {
    const classes = authContainerStyles();

    return (
        <Fragment>
            <div style={{ height: navbarHeight }}></div>
            <Container component="main" maxWidth={maxWidth} className={classes.authContainer} style={{ height: `calc(100vh - ${navbarHeight}px)` }}>
                {children}
            </Container>
        </Fragment>
    )
}
// part of the app state to retrieve
const mapStateToProps = (state) => ({ navbarHeight: state.navbar.height })

export default connect(mapStateToProps)(AuthContainer);