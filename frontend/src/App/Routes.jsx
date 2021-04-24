import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarContainer from './Navbar/NavbarContainer';
import Home from '../Home/Home';
import PrivateRoute from './privateRoute';
import PageNotFound from './PageNotFound/PageNotFound';
import LoginContainer from '../Auth/Login/LoginContainer';
import ChatsContainer from '../Chat/ChatsContainer';
import SingleChatContainer from '../Chat/SingleChat/SingleChatContainer';
import SignupContainer from "../Auth/SignUp/SignUpContainer";

// Routes located in the main section of the page
const Routes = () => (
    <Router>
        <NavbarContainer />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/inscription" component={SignupContainer} />
            <Route exact path="/connexion" component={LoginContainer} />
            <PrivateRoute exact path="/chats" component={ChatsContainer} />
            <Route exact path="/chats/:code" component={SingleChatContainer} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    </Router>
)

export default Routes;