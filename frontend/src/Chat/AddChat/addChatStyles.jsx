import { makeStyles } from '@material-ui/core/styles';

// Styles for add chat component
const addChatStyles = makeStyles(theme => ({
    chatNameInput: {
        marginBottom: theme.spacing(4)
    },
    datePicker: {
        width: 250,
        marginBottom: theme.spacing(2)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
        textTransform: 'none'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));

export default addChatStyles;