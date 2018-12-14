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
