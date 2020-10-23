import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from "./Navbar";
import { showLogoutNotif } from "../../Auth/Logout/logoutAction";


class NavbarContainer extends Component {

    render() {
        return <Navbar showLogoutNotif={this.props.showLogoutNotif} navbarHeight={this.props.navbarHeight} />
    }
}

const mapStateToProps = (state) => ({ navbarHeight: state.navbar.height })

const mapDispatchToProps = (dispatch) => ({
    showLogoutNotif: () => dispatch(showLogoutNotif()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)