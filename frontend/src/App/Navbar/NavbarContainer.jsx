import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isLogged, logout } from '../../Auth/Login/loginActions';
import Navbar from './Navbar';

class NavBarContainer extends Component {

    componentDidMount() {
        const { isLogged } = this.props;
        isLogged();
    }

    render() {
        const { logged, logout } = this.props;

        return <Navbar logged={logged} logout={logout} />
    }
}

const mapStateToProps = (state) => ({
    logged: state.login.logged
})

const mapDispatchToProps = (dispatch) => ({
    isLogged: () => dispatch(isLogged()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBarContainer);