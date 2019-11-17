import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

import { Container } from 'reactstrap';

//redux
import { Provider } from 'react-redux';
import store from './store';

import { loadUser } from './actions/authActions';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    //we want to load user after rendering to know if the user has authenticated
    componentDidMount() {
        //because we have direct access to store from here, we can dispatch the function directly
        store.dispatch(loadUser());
    }

    render() {
        return (
            //provider is needed to access the states of the app from the components (this is redux)
            //container helps to format itemmodal to the center alongside shoppinglist
            <Provider store={store}>
                <div className="App">
                    <AppNavbar />
                    <Container>
                        <ItemModal />
                        <ShoppingList />
                    </Container>
                </div>
            </Provider>
        );
    }
}

export default App;
