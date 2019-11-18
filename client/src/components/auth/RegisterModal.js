import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        //for error messages
        msg: null
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    //to show in the input what is being written
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        //for now this function does not connect to backend

        //prevents the bowser behaviour
        e.preventDefault();

        //close modal
        this.toggle();
    };

    //this modal will be access from a navlink, so that we can include it
    //to the existing appnavbar component
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    //input name has to coincide with state name
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    //this classname to separate a little bit the fields of the modal
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >
                                    Add Item
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

RegisterModal.propTypes = {
    //not isrequired because it could be null
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    //we need these two attributes for this modal:
    //isauthenticated to close modal when registered, error for any error message
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {})(RegisterModal);
