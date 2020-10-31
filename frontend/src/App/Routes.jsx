import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarContainer from './Navbar/NavbarContainer';
import Home from '../Home/Home';
import SignupFormContainer from '../Auth/SignUp/SignupFormContainer';
import PrivateRoute from './privateRoute';
import PageNotFound from './PageNotFound/PageNotFound';
import LoginFormContainer from '../Auth/Login/LoginFormContainer';
import RoomsContainer from '../Room/RoomsContainer';
import SingleRoomContainer from '../Room/SingleRoom/SingleRoomContainer';

const Routes = () => (
    <Router>
        <NavbarContainer />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/inscription" component={SignupFormContainer} />
            <Route exact path="/connexion" component={LoginFormContainer} />
            <PrivateRoute exact path="/salons" component={RoomsContainer} />
            <Route exact path="/salons/:code" component={SingleRoomContainer} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    </Router>
)

export default Routes;