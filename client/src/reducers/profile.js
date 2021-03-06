import { LOGIN_SUCCESS, UPDATE_FORM_FIELD, GET_CURRENT_PROFILE, UPDATE_PROFILE_SUCCESS, CHANGE_DISPLAY, GET_USER_PROFILE_LISTINGS_SUCCESS, SIGNUP_SUCCESS } from '../constants';
const initialState = {
  profileForm: {
    firstName: '',
    lastName: '',
    email: '',
    businessName: null,
    address: '',
    city: '',
    zip: '',
    state: '',
    profile_img_path: '',
    role: 'customer',
    profileUpdated: false,
  },
  display: 'dashboard',
  profileUserListings: [],
};
export const profile = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_PROFILE:
      return ({ ...state, profileForm: { ...state.profileForm, ...action.user } });
    case UPDATE_FORM_FIELD:
      return ({ ...state,
        profileForm:
        { ...state.profileForm, [action.field]: action.value,
          profileUpdated: false } });
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return ({ ...state, profileForm: { ...state.profileForm, ...action.data.user } });
    case UPDATE_PROFILE_SUCCESS:
      return ({ ...state, profileForm: { ...state.profileForm, ...action.data, profileUpdated: true } });
    case GET_USER_PROFILE_LISTINGS_SUCCESS:
      return ({ ...state, profileUserListings: action.listings });
    case CHANGE_DISPLAY:
      return ({ ...state, display: action.route });
    default:
      return state;
  }
};
