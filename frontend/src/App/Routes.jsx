import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarContainer from './Navbar/NavbarContainer';
import Home from '../Home/Home';
import SignupFormContainer from '../Auth/SignUp/SignupFormContainer';
import PrivateRoute from './privateRoute';
import PageNotFound from './PageNotFound/PageNotFound';
import LoginFormContainer from '../Auth/Login/LoginFormContainer';
import ChatsContainer from '../Chat/ChatsContainer';
import SingleChatContainer from '../Chat/SingleChat/SingleChatContainer';

const Routes = () => (
    <Router>
        <NavbarContainer />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/inscription" component={SignupFormContainer} />
            <Route exact path="/connexion" component={LoginFormContainer} />
            <PrivateRoute exact path="/chats" component={ChatsContainer} />
            <Route exact path="/chats/:code" component={SingleChatContainer} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    </Router>
)

export default Routes;