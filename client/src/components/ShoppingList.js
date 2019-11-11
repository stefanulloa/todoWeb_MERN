import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid'; //to make tests before connecting with backend

import { connect } from 'react-redux'; //it allows to access state on react component
import { getItems } from '../actions/itemActions';

import PropTypes from 'prop-types'; //validation for component properties

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    render() {
        //destructuring, quickly extracts the property inside {} from the object on the rigth side
        //props.item represents the whole state in itemreducer
        const { items } = this.props.item;
        return(
            <Container>
                <Button 
                    color="dark"
                    style={{marginBottom: '2em'}}
                    onClick={ () => {
                        const name = prompt('Enter Item');
                        //if field was filled, add to state (list of items)
                        if(name) {
                            this.setState(state => ({
                                //spread operator ...list spreads list components as arguments
                                //name same as name:name because both parts are identical
                                items: [...state.items, { id: uuid(), name}]
                            }));
                        }
                }}>
                    Add Item
                </Button>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ id, name}) => (
                            //before declaring each ListGroup item, we define the transition
                            //it needs a unique key (so we use id) and it also needs at least one classNames attr
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                        className="remove-btn"
                                        color="danger" 
                                        size="sm" 
                                        //we remove item (FROM UI) by using filter method that sets as items those that don't correspond with that id
                                        onClick={() => {
                                            this.setState(state => ({
                                                items: state.items.filter(item => item.id !== id)
                                            }));    
                                        }}>
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        )
    }
}

//to check the new properties of the component
ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

//this function changes a state to a prop (a component property) so that it can be used on the frontend
const mapStateToProps = (state) => ({
    //".item" because it was specified as such on rootreducer (inside combinereducers)
    item: state.item
});

//we have to connect the component to the app redux store
export default connect(mapStateToProps, { getItems })(ShoppingList);