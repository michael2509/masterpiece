import { makeStyles } from "@material-ui/core";

// Styles for auth container
const authContainerStyles = makeStyles(theme => ({
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

export default authContainerStyles;