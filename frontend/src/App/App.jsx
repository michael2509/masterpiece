import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Footer/Footer';
import Home from '../Home/Home';
import { Provider as ReduxStoreProvider } from 'react-redux';
import configureStore from './configure-store';
import SignupFormContainer from '../Auth/SignUp/SignupFormContainer';
import NotificationContainer from '../Notification/NotificationContainer';
import RoomContainer from '../Room/RoomContainer';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './privateRoute';
import PageNotFound from './PageNotFound/PageNotFound';
import LoginFormContainer from '../Auth/Login/LoginFormContainer';
import NavbarContainer from './Navbar/NavbarContainer';

const store = configureStore();

const App = () => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ReduxStoreProvider store={store}>
            <Router>
                <CssBaseline />
                <NavbarContainer />
                <Container component="main" maxWidth="xl" style={{ minHeight: `calc(100vh - ${store.getState().navBar.height}px)` }}>
                    <Switch>
                        <Route exact path="/inscription" component={SignupFormContainer} />
                        <Route exact path="/connexion" component={LoginFormContainer} />
                        <PrivateRoute exact path="/salons" component={RoomContainer} />
                        <Route exact path="/" component={Home} />
                        <Route path="*" component={PageNotFound} />
                    </Switch>
                </Container>
            </Router>
            <NotificationContainer />
            <Footer />
        </ReduxStoreProvider>
    </MuiPickersUtilsProvider>
)

export default App;