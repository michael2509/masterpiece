import React from 'react';
import Footer from './Footer/Footer';
import { Provider as ReduxStoreProvider } from 'react-redux';
import configureStore from './configure-store';
import NotificationContainer from '../Notification/NotificationContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './Routes';

const store = configureStore();

const App = () => (
    <ReduxStoreProvider store={store}>
        <CssBaseline />
        <Routes />
        <NotificationContainer />
        <Footer />
    </ReduxStoreProvider>
)

export default App;