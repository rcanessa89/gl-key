/**
 * This function is a router helper,
 * it takes a router path and params and parse it in
 * to a match route path, it show an error in the console
 * if the params does not exist in the path parameter
 * @param {string} path app router path
 * @param {Object} params path parameters
 * @return {string} match path with params
 */
export default (path: string, params: any): string => {
  const keys: string[] = Object.keys(params);
  let parsedPath: string = path;

  keys.forEach((k: string) => {
    if (parsedPath.indexOf(`:${k}`) === -1) {
      console.error(`parsePath: The parameter "${k}" not exist in "${path}"`);
    }

    parsedPath = parsedPath.replace(`:${k}`, params[k]);
  });

  return parsedPath;
};
