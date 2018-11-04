import { message } from 'antd';

const request = (url, method = 'POST', data = undefined) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data, undefined, 2) : undefined,
  };

  return fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      };

      if (response.status !== 204 /* No content */) {
        return response.json();
      }
    })
    .catch(error => {
      message.error(error.message);
      throw error;
    });
};

export default {
  get: url => request(url, 'GET'),

  post: (url, data = {}) => request(url, 'POST', data),

  patch: (url, data = {}) => request(url, 'PATCH', data),

  delete: (url, data = {}) => request(url, 'DELETE', data),
};
