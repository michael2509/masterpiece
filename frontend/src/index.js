import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SignupForm from './components/SignupForm/SignupForm';
import LoginForm from './components/LoginForm/LoginForm';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

const RoutesWithNavbar = () => (
    <div>
        <Navbar />
        <div style={{ marginTop: 150 }}></div>
        <Route path="/" component={Home} />
    </div>
)


const Root = () => (
    <div>
    <Router>
        <Switch>
            <Route exact path="/inscription" component={SignupForm} />
            <Route exact path="/connexion" component={LoginForm} />
            <Route path="/" component={RoutesWithNavbar} />
        </Switch>
    </Router>
    <Footer />
    </div>
)

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
