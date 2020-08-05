import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Home from '../Home/Home';
import { Provider as ReduxStoreProvider } from 'react-redux';
import configureStore from './configure-store';
import SignupFormContainer from '../Auth/SignUp/SignupFormContainer';
import NotificationContainer from '../Notification/NotificationContainer';
import EventContainer from '../Event/EventContainer';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginForm from '../Auth/Login/LoginForm';
import PrivateRoute from './privateRoute';

const store = configureStore();

const RoutesWithNavbar = () => (
    <div>
        <Navbar />
        <div style={{ marginTop: 100 }}></div>
        <Container component="main" maxWidth="sm" style={{ minHeight: "calc(100vh - 100px)" }}>
            <CssBaseline />
            <PrivateRoute exact path="/evenements" component={EventContainer} />
            <PrivateRoute exact path="/" component={Home} />
        </Container>
    </div>
)

const AuthRoutes = () => (
    <div className="auth-bg">
        <Container component="main" maxWidth="xs" className="auth-container">
            <CssBaseline />
            <Route exact path="/inscription" component={SignupFormContainer} />
            <Route exact path="/connexion" component={LoginForm} />
        </Container>
    </div>
)

const App = () => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ReduxStoreProvider store={store}>
            <Router>
                <Switch>
                    <Route path={["/inscription", "/connexion"]} component={AuthRoutes} />
                    <Route path="/" component={RoutesWithNavbar} />
                </Switch>
            </Router>
            <NotificationContainer />
            <Footer />
        </ReduxStoreProvider>
    </MuiPickersUtilsProvider>
)

export default App;