import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import LandingPage from './LandingPage';
import Signup from './Signup/Signup';
import Login from './Login';
import Profile from './Profile/Profile';
import App from './App';
import FullListing from './Listing/FullListing';
import NotFound from './NotFound';
import configureStore from '../configureStore';
import AddListing from './Listing/AddListing/AddListing';
import AllListings from './Listing/AllListings/AllListings';
import AllRatings from './Ratings/AllRatings';
import NewRating from './Ratings/NewRating';
import About from './About';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

const requireAuth = (nextState, replace) => {
  if (!localStorage.getItem('raptor_token')) {
    replace('/login');
  }
};

const Root = () =>
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/about" component={About} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} onEnter={requireAuth} />
        <Route path="/listings/:id" component={FullListing} onEnter={requireAuth} />
        <Route path="/addlisting" component={AddListing} onEnter={requireAuth} />
        <Route path="/listings" component={AllListings} />
        <Route path="/user/:id/ratings" component={AllRatings} onEnter={requireAuth} />
        <Route path="/user/:id/ratings/new" component={NewRating} onEnter={requireAuth} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/user/:id/dashboard" component={Profile} />
        <Route path="/user/:id/inbox" component={Profile} />
        <Route path="/user/:id/settings" component={Profile} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>;

export default Root;
