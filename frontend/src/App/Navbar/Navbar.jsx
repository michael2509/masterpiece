import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import "./Navbar.css";
import { isLogged, logout } from '../../Auth/authService';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
}));

function Navbar(props) {
    const { container, history } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutAndRedirect = () => {
        logout();
        history.push("/connexion")
    }

    const logged = isLogged();
    let navLinks;

    if (logged) {
        navLinks = [
            { title: 'meetings', path: '/meetings', icon: <MeetingRoomIcon /> },
            { title: 'deconnexion', icon: <ExitToAppIcon /> },
        ]
    } else {
        navLinks = [
            { title: 'inscription', path: '/inscription', icon: <PersonAddIcon /> },
            { title: 'connexion', path: '/connexion', icon: <AccountCircleIcon /> },
        ]
    }

    const drawer = (
        <div>
            <div className={`${classes.toolbar} drawerLogo`}>
                <Typography className="drawerLogoTitle" variant="h6" noWrap>
                    <Link className="drawerLink" to="/">ZenAsk</Link>
                </Typography>
            </div>
            <Divider />
            <List>
                {navLinks.map(({ title, path, icon }, index) => {
                    if (title === "deconnexion") {
                        return (
                            <ListItem onClick={logoutAndRedirect} key={index} button>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItem>
                        )
                    } else {
                        return(
                            <Link to={path} className="drawerLink" key={index}>
                                <ListItem button>
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText primary={title} />
                                </ListItem>
                            </Link>
                        )
                    }
                })}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>ZenAsk</Typography>
                    <Hidden smDown>
                        <div style={{ flexGrow: 1 }} />
                        <List style={{ display: "flex" }}>
                            {navLinks.map(({ title, path }, index) => {
                                if (title === "deconnexion") {
                                    return (
                                        <ListItem key={index} onClick={logout} button>
                                            <ListItemText primary={title} />
                                        </ListItem>
                                    )
                                } else {
                                    return (
                                        <Link to={path} className="navbarLink" key={index}>
                                            <ListItem button>
                                                <ListItemText primary={title} />
                                            </ListItem>
                                        </Link>
                                    )
                                }
                            })}
                        </List>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default withRouter(Navbar);