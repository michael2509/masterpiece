import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import LoginForm from '../Login/LoginForm';
import Footer from './Footer/Footer';
import Home from '../Home/Home';
import { Provider } from 'react-redux';
import configureStore from './configure-store';
import SignupFormContainer from '../SignUp/SignupFormContainer';

const store = configureStore();

const RoutesWithNavbar = () => (
    <div>
        <Navbar />
        <div style={{ marginTop: 150 }}></div>
        <Route path="/" component={Home} />
    </div>
)

const App = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/inscription" component={SignupFormContainer} />
                <Route exact path="/connexion" component={LoginForm} />
                <Route path="/" component={RoutesWithNavbar} />
            </Switch>
        </Router>
        <Footer />
    </Provider>
)

export default App;