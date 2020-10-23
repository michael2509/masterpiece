import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Footer/Footer';
import Home from '../Home/Home';
import { Provider as ReduxStoreProvider } from 'react-redux';
import configureStore from './configure-store';
import SignupFormContainer from '../Auth/SignUp/SignupFormContainer';
import NotificationContainer from '../Notification/NotificationContainer';
import RoomContainer from '../Room/RoomContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
import PrivateRoute from './privateRoute';
import PageNotFound from './PageNotFound/PageNotFound';
import LoginFormContainer from '../Auth/Login/LoginFormContainer';
import NavbarContainer from './Navbar/NavbarContainer';

const store = configureStore();

const App = () => (
    <ReduxStoreProvider store={store}>
        <CssBaseline />
        <Router>
            <NavbarContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/inscription" component={SignupFormContainer} />
                <Route exact path="/connexion" component={LoginFormContainer} />
                <PrivateRoute exact path="/salons" component={RoomContainer} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </Router>
        <NotificationContainer />
        <Footer />
    </ReduxStoreProvider>
)

export default App;