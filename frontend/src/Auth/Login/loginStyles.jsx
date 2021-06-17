import { makeStyles } from '@material-ui/core/styles';

// Styles for login component using material ui theme
const loginStyles = makeStyles(theme => ({
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
    paper: {
        width: "100%",
        padding: "60px"
    }
}));

export default loginStyles;