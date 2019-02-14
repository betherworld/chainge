/**
 * Promiseifies a function
 * @param {function} fn The function to promiseify
 * @param  {...any} args The function arguments
 * @returns {function} The promiseified function
 */
export const promiseify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (error, returnValue) => {
      if (error) {
        return reject(error);
      }

      return resolve(returnValue);
    });
  });
};
