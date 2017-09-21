// All api methods will return a promise
import { post, get } from '../ApiUtils';

export function loginUser(body) {
  return post('/login', body);
}

export function resetPass(body) {
  return post('/send_reset_email', body);
}

export function signupUser(body) {
  return post('/signup', body);
}

export function getSessions(body) {
  return get('/api/sessions', body);
}