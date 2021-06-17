import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import footerStyles from './footerStyles';

// Copyright section
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                WeChat
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


// Footer component
export default function StickyFooter() {
    const classes = footerStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">Application réalisé par Michael De Madet.</Typography>
                <Copyright />
            </Container>
        </footer>
    );
}