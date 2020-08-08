import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Home from '../Home/Home';
import { Provider as ReduxStoreProvider } from 'react-redux';
import configureStore from './configure-store';
import SignupFormContainer from '../Auth/SignUp/SignupFormContainer';
import NotificationContainer from '../Notification/NotificationContainer';
import MeetingContainer from '../Meeting/MeetingContainer';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginForm from '../Auth/Login/LoginForm';
import PrivateRoute from './privateRoute';
import PageNotFound from './PageNotFound/PageNotFound';

const store = configureStore();

const App = () => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ReduxStoreProvider store={store}>
            <Router>
                <CssBaseline />
                <Navbar />
                <div style={{ marginTop: 100 }}></div>
                <Container component="main" maxWidth="sm" style={{ minHeight: "calc(100vh - 100px)" }}>
                    <Switch>
                        <Route exact path="/inscription" component={SignupFormContainer} />
                        <Route exact path="/connexion" component={LoginForm} />
                        <PrivateRoute exact path="/meetings" component={MeetingContainer} />
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