import queryString from 'query-string';

const SERVER_URL = 'https://www.jamly.co';

export function post(api, body) {
  return fetch(`${SERVER_URL}${api}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  });
}

export function get(api, query) {
  return fetch(`${SERVER_URL}${api}?${queryString.stringify(query)}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      }
  });
}
