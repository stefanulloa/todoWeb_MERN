import React, { Component, Fragment } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

//we want to check some states from auth to adapt navbar to login or logout actions
//thus, we need connect (also proptypes)
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth//Logout';

class AppNavbar extends Component {
    //we dont need constructor because we are using arrow functions
    state = {
        isOpen: false
    };

    //to expand or collapse the navbar
    //this is a arrow function
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    //Navbar dark (to know what color to use for letters), expand (hamburger menu, sm for small screens)
    //Collapse we have to indicate it is for a navbar
    //Nav ml/auto alligns links to the right, we indicate it is for navbar
    render() {
        //these properties of auth state will be used for navbar login/logout behaviour
        const { isAuthenticated, user } = this.props.auth;

        //fragment allow us to define the other react elements without adding any new one
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{ user? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal />
                </NavItem>
                <NavItem>
                    <LoginModal />
                </NavItem>
            </Fragment>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoopingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

//so that it can be accessed externally
export default connect(mapStateToProps, null)(AppNavbar);
