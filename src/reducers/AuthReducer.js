import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_REQUEST,
    LOGOUT,
    RESET_PASSWORD,
    SIGNUP_INPUT_CHANGED,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    error: '',
    user: null,
    isAuthenticated: false,
    token: '',
    signup: {
        name: '',
        email: '',
        password: '',
        rpassword: '',
        error: '',
        loading: false
    }
};

export default (state = INITIAL_STATE, action) => {
        switch (action.type) {
          case EMAIL_CHANGED:
            return { ...state, email: action.payload };
          case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
          case LOGIN_USER_SUCCESS:
            return {
              ...state,
              ...INITIAL_STATE,
              user: action.user,
              token: action.token,
              isAuthenticated: true
            };
          case LOGIN_USER_FAILED:
            return { ...state, error: action.err, password: '', loading: false };
          case LOGIN_REQUEST:
            return { ...state, error: '', loading: true, isAuthenticated: false };
          case LOGOUT:
            return INITIAL_STATE;
          case RESET_PASSWORD:
            return { ...state, error: '', loading: true, isAuthenticated: false };
          case SIGNUP_INPUT_CHANGED:
            return {
              ...state,
              signup: {
                ...state.signup,
                [action.payload.key]: action.payload.val
              }
            };
          case SIGNUP_REQUEST:
            return { ...state, isAuthenticated: false, signup: { ...state.signup, error: '', loading: true } };
          case SIGNUP_SUCCESS:
            return {
              ...state,
              ...INITIAL_STATE,
              user: action.user,
              token: action.token,
              isAuthenticated: true
            };
          case SIGNUP_FAILED:
            return { ...state, signup: { ...state.signup, error: action.err, loading: false } };
          default:
            return state;
        }
    };
