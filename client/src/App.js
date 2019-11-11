import React from 'react';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

//redux
import { Provider } from 'react-redux';
import store from './store';

//css
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    //provider is needed to access the states of the app from the components (this is redux)
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    </Provider>
    
  );
}

export default App;
