import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { auth } from './auth';
import { listing } from './listing';

export default combineReducers({
  auth,
  listing,
  routing: routerReducer,
});

