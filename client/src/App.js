import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import store from './store';
import { Provider } from 'react-redux';
import setAuthToken from './util/setAuthToken';
import { loadUser } from './actions/auth';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import Category from './components/shopCategory/Category';
import ItemPage from './components/shopCategory/ItemPage';
import SetAlert from './components/layout/Alert';
import { loadCart } from './actions/item';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/cart/CheckoutForm';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const promise = loadStripe(
  'pk_test_51HItWYKO7o30XvjPRnx2tydtZlwbq7m2BezjjAVJisql6MynNZyqphFrnESlPyFRyPPDaR6eO7e7gsEr9JdXr7qT00pq29KydU'
);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadCart());
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
        {/* <Navbar /> */}
        <Router>
          <Navbar />
          <SetAlert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/category/:category" component={Category} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/:category/item/:id" component={ItemPage} />
            <Elements stripe={promise}>
              <Route exact path="/checkout" component={CheckoutForm} />
            </Elements>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
