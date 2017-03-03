import { GET_CURRENT_LISTING_SUCCESS, FETCHING_LISTING, CHANGE_CONTACT_FIELD } from '../constants';
import { changeCenter, addMapMarker } from './googleMapActions';
import { fetchCurrentListing } from './api';


const startFetchListing = () =>
  ({
    type: FETCHING_LISTING,
  });

export const changeContactField = (field, value) =>
  ({
    type: CHANGE_CONTACT_FIELD,
    field,
    value,
  });

export const getCurrentListingSuccess = payload =>
  ({
    type: GET_CURRENT_LISTING_SUCCESS,
    payload,
  });

export const getCurrentListing = listingId =>
  (dispatch) => {
    dispatch(startFetchListing());
    fetchCurrentListing(listingId)
    .then((res) => {
      res.json()
      .then((data) => {
        dispatch(changeCenter(data));
        dispatch(addMapMarker(data));
        dispatch(getCurrentListingSuccess(data));
      });
    });
  };
