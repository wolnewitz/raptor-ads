import { GET_ALL_LISTINGS, GET_ALL_LISTINGS_SUCCESS, FETCHING_LISTINGS, CHANGE_SEARCH_FIELD } from '../constants';
import { changeCenter, addMapMarkers } from './googleMapActions';
import { fetchAllListings } from './api';

const startFetchListings = () =>
  ({
    type: FETCHING_LISTINGS,
  });

const getAllListingsSuccess = payload =>
  ({
    type: GET_ALL_LISTINGS_SUCCESS,
    payload,
  });

export const getAllListings = () =>
  (dispatch, getState) => {
    dispatch(startFetchListings());
    fetchAllListings()
    .then((res) => {
      res.json()
      .then((data) => {
        console.log('STATE IS', getState().auth.loggedInUser);
        if (getState().auth.loggedInUser.role === 'professional') {
          console.log('the business!!!')
          dispatch(changeCenter(getState().auth.loggedInUser.business));
        } else {
          dispatch(changeCenter(getState().auth.loggedInUser));
        }
        dispatch(addMapMarkers(data));
        dispatch(getAllListingsSuccess(data));
      });
    });
  };

export const changeSearchField = value =>
  ({
    type: CHANGE_SEARCH_FIELD,
    value,
  });



// export const getAllListings = () => {
//   (dispatch) => {
//     dispatch(startFetchListings());
//     fetchAllListings()
//     .then((res) => {
//       console.log('HERE')
//       res.json()
//       .then((data) => {
//         dispatch(getAllListingsSuccess(data));
//       });
//     });
//   };
// };