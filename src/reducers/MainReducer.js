import {
    GET_SESSIONS,
    GET_FIRST_SESSIONS,
    GET_SESSIONS_SUCCESS,
    GET_SESSIONS_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    sessions: [],
    loading: true, // since we're loading in SplashScreen
    firstSessionloading: true,
    searching: false,
    searchResults: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_SESSIONS:
            return { ...state, loading: true };
        case GET_FIRST_SESSIONS:
            return INITIAL_STATE;
        case GET_SESSIONS_SUCCESS:
            return { ...state, sessions: state.sessions.concat(action.sessions), loading: false, firstSessionloading: false };
        case GET_SESSIONS_FAILED:
            return { ...state, sessions: [], loading: false, firstSessionloading: false };
        default:
            return state;
    }
};
