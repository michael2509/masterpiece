import { makeStyles } from '@material-ui/core/styles';

const footerStyles = makeStyles(theme => ({
    footer: {
        textAlign: "center",
        padding: theme.spacing(3, 2),
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
    },
}));

export default footerStyles;