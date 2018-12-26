/**
 * This function returs a environment variable value,
 * it show a console error if the variable does not exist
 * @param {string} c environment variable suffix
 * @return {string} environment variable value
 */
export default (c: string): string => {
  const key: string = `REACT_APP_${c.toUpperCase()}`;
  const value = process.env[key] as string;

  if (!value) {
    console.error(`getEnvVar: Env variable ${key} not exist in ${process.env.NODE_ENV}`);
  }

  return value;
};
