import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../Auth/authService';

// Create a route accessible only by a logged user
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isLogged() ? <Component {...props} /> : <Redirect to={{ pathname: '/connexion', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;