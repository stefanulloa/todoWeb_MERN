import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import uuid from 'uuid'; //to make tests before connecting with backend

class ShoppingList extends Component {
    state = {
        items: [
            { id: uuid(), name: 'Eggs'},
            { id: uuid(), name: 'Oranges'},
            { id: uuid(), name: 'Rice'},
            { id: uuid(), name: 'Shampoo'},
        ]
    }

    render() {
        //destructuring, quickly extracts the property inside {} from the object on the rigth side
        const { items } = this.state;
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

export default ShoppingList;