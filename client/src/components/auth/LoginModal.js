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
    NavLink,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        //for error messages
        msg: null
    };

    //this will be called once we try to summit the register func
    componentDidUpdate(prevProps) {
        //deconstructing
        const { error, isAuthenticated } = this.props;
        //if something has changed (error occuring)
        if (error !== prevProps.error) {
            //check for the register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        //we close the modal if registering goes correctly
        if (this.state.modal && isAuthenticated) this.toggle();
    }

    toggle = () => {
        //if we close the modal, we have to clear the error message
        this.props.clearErrors();
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

        const { email, password } = this.state;

        const user = {
            email,
            password
        };

        this.props.login(user);

        //in this modal we dont close when attempting to login
        //because in case of error we want to output error message
    };

    //this modal will be access from a navlink, so that we can include it
    //to the existing appnavbar component
    //in case of error we use alert to show message
    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? (
                            <Alert color="danger"> {this.state.msg} </Alert>
                        ) : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Label for="password">Password</Label>
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
                                    Login user
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

LoginModal.propTypes = {
    //not isrequired because it could be null
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    //we need these two attributes for this modal:
    //isauthenticated to close modal when registered, error for any error message
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
