import { IAppRoute } from '@interfaces';
import routes from '../config/routes';

export default () => {
  const plainRoutes: IAppRoute[] = [];

  const plainFunc = (ra: IAppRoute[]) => {
    ra.forEach(r => {
      if (r.nested && r.nested.length) {
        plainRoutes.push(r);

        plainFunc(r.nested);
      } else {
        plainRoutes.push(r);
      }
    });
  };

  plainFunc(routes);

  return plainRoutes;
};