import React from 'react';
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
import { useTheme } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { isLogged, logout } from '../../Auth/authService';
import { Typography } from '@material-ui/core';
import navbarStyles from './navbarStyles';

// Navbar component
function Navbar(props) {
    const { container, history, openNotification } = props;
    const classes = navbarStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutAndRedirect = () => {
        logout();
        openNotification("Vous êtes déconnecté", "info");
        history.push("/connexion");
    }

    // Check if user is logged
    const logged = isLogged();
    let navLinks;

    // Display different buttons in navbar if user is logged or not
    if (logged) {
        navLinks = [
            { title: 'chats', path: '/chats', icon: <MeetingRoomIcon /> },
            { title: 'Déconnexion', icon: <ExitToAppIcon /> },
        ]
    } else {
        navLinks = [
            { title: 'Inscription', path: '/inscription', icon: <PersonAddIcon /> },
            { title: 'Connexion', path: '/connexion', icon: <AccountCircleIcon /> },
        ]
    }

    // Drawer for mobile menu
    const drawer = (
        <div>
            <div className={`${classes.toolbar} ${classes.drawerLogo} ${classes.logoWrapper}`}>
                <Link to="/" className={classes.drawerLink}>
                    <Typography>WeChat</Typography>
                </Link>
            </div>
            <Divider />
            <List>
                {navLinks.map(({ title, path, icon }, index) => {
                    if (title === "Déconnexion") {
                        return (
                            <ListItem onClick={logoutAndRedirect} key={index} button>
                                <ListItemIcon>{icon}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItem>
                        )
                    } else {
                        return(
                            <Link to={path} className={classes.drawerLink} key={index}>
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
                <Toolbar style={{ height: props.navbarHeight }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" className={classes.navbarLink}>
                        <Typography>WeChat</Typography>
                    </Link>
                    <Hidden smDown>
                        <div style={{ flexGrow: 1 }} />
                        <List style={{ display: "flex" }}>
                            {navLinks.map(({ title, path }, index) => {
                                if (title === "Déconnexion") {
                                    return (
                                        <ListItem key={index} onClick={logoutAndRedirect} button>
                                            <ListItemText primary={title} />
                                        </ListItem>
                                    )
                                } else {
                                    return (
                                        <Link to={path} className={classes.navbarLink} key={index}>
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

export default withRouter(Navbar);