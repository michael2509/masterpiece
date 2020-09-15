import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from "./Navbar";
import { showLogoutNotif } from "../../Auth/Logout/logoutAction";


class NavbarContainer extends Component {

    render() {
        return <Navbar showLogoutNotif={this.props.showLogoutNotif} />
    }
}

const mapDispatchToProps = (dispatch) => ({
    showLogoutNotif: () => dispatch(showLogoutNotif()),
});

export default connect(null, mapDispatchToProps)(NavbarContainer)