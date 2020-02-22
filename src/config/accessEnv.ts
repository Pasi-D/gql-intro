/*****************************************************************************************
 * Accesses a variable inside of process.env; throws an error if its not found.
 *
 * Always run this method in advance (i.e upon initialization) so that the error
 * is thrown as early as possible.
 *
 * caching the values to improve the performance - accessing process.env many times is bad.
 ****************************************************************************************/
const cache = {};

const accesssEnv = (key: string, defaultValue?: any): any => {
  // If the environment variable is not declared.
  if (![key in process.env]) {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in process.env`);
  }

  // If returned as undefined
  if (process.env[key] === undefined) {
    if (defaultValue) return defaultValue;
    throw new Error(`${key} not found in process.env`);
  }

  if (cache[key]) return cache[key];

  cache[key] = process.env[key];

  return process.env[key];
};

export default accesssEnv;
