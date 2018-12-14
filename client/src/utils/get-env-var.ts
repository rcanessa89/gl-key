export default (c: string): string => {
  const key: string = `REACT_APP_${c.toUpperCase()}`;
  const value = process.env[key] as string;

  if (!value) {
    console.error(`getEnvVar: Env variable ${key} not exist in ${process.env.NODE_ENV}`);
  }

  return value;
};
