const login = '/login';
const main = '/';
const entries = main;
const assests = '/assests';
const exports = '/exports';
const publicRouteRedirect = entries;
const protectedRouteRedirect = login;
const noMatch = '/404';

export default {
  assests,
  entries,
  exports,
  login,
  main,
  noMatch,
  protectedRouteRedirect,
  publicRouteRedirect,
};
