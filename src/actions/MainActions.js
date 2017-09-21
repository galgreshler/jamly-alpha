import {
  GET_SESSIONS,
  GET_FIRST_SESSIONS,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_FAILED
} from './types';

export const getSessions = (excludeIds) => {
  return {
    type: GET_SESSIONS,
    excludeIds
  };
};

export const getFirstSessions = () => {
  return {
    type: GET_FIRST_SESSIONS
  };
};

export function getSessionsSuccess(sessions) {
  return {
    type: GET_SESSIONS_SUCCESS,
    sessions
  };
}

export function getSessionsFailed() {
  return {
    type: GET_SESSIONS_FAILED
  };
}