import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { connect } from "react-redux"; //it allows to access state on react component
import { getItems, deleteItem } from "../actions/itemActions";

import PropTypes from "prop-types"; //validation for component properties

class ShoppingList extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    };

    render() {
        //destructuring, quickly extracts the property inside {} from the object on the rigth side
        //props.item represents the whole state in itemreducer
        const { items } = this.props.item;
        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            //before declaring each ListGroup item, we define the transition
                            //it needs a unique key (so we use id) and it also needs at least one classNames attr
                            <CSSTransition
                                key={id}
                                timeout={500}
                                classNames="fade"
                            >
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        //bind required
                                        onClick={this.onDeleteClick.bind(this,id)}
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

//to check the new properties of the component
ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};

//this function changes a state to a prop (a component property) so that it can be used on the frontend
const mapStateToProps = state => ({
    //".item" because it was specified as such on rootreducer (inside combinereducers)
    item: state.item
});

//we have to connect the component to the app redux store
export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(ShoppingList);
