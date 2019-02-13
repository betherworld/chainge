const API_URL = process.env.API_URL;

/**
 * Custom Error which can include more data than the standard JS error.
 */
class ApiError extends Error {
  constructor(message, statusCode, statusText, errors = []) {
    super(message);
    this.errors = errors;
    this.statusCode = statusCode;
    this.statusText = statusText;
  }
}

/**
 * Fetches from the api
 * @param {string} url The relative url
 * @param {Object} options The fetch options
 * @returns {Promise} The fetch promise
 */
export const fetchApi = (url, options) => {
  const token = localStorage.getItem("jwt-token");

  if (!options.headers) {
    options.headers = new Headers();
  }

  if (!options.headers.get("Content-Type")) {
    options.headers.append("Content-Type", "application/json");
  }

  if (!options.headers.get("Authorization") && token) {
    options.headers.append("Authorization", "Bearer " + token);
  }

  return fetch(API_URL + url, options).then(response => {
    return response.json().then(json => {
      return response.ok
        ? Promise.resolve({ response, json })
        : Promise.reject(
            new ApiError(
              json.message,
              response.status,
              response.statusText,
              json.errors
            )
          );
    });
  });
};
