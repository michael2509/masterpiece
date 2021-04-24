import { makeStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

// Styles for navbar using material ui theme
const navbarStyles = makeStyles(theme => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('md')]: {
            width: `100%`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logoWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        height: 40
    },
    drawerLink: {
        textDecoration: "none",
        color: "black"
    },
    drawerLogo: {
        display: "flex",
    },
    drawerLogoTitle: {
        margin: "auto !important",
    },
    navbarLink: {
        textDecoration: "none",
        color: "white"
    },
    iconsColor: {
        fill: "white"
    }
}));

export default navbarStyles;