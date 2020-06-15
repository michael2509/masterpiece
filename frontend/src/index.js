import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/LoginForm/LoginForm';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import { Provider } from 'react-redux';
import configureStore from './redux/configure-store';
import SignupFormContainer from './components/containers/SignupFormContainer';

const store = configureStore();

const RoutesWithNavbar = () => (
    <div>
        <Navbar />
        <div style={{ marginTop: 150 }}></div>
        <Route path="/" component={Home} />
    </div>
)

const Root = () => (
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

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
