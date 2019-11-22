import React, { Component } from 'react';

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
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="/">ShoopingList</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <RegisterModal />
                                </NavItem>
                                <NavItem>
                                    <LoginModal />
                                </NavItem>
                                <NavItem>
                                    <Logout />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

//so that it can be accessed externally
export default AppNavbar;
