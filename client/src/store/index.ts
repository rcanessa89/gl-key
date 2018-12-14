import devConfig from './config/dev';
import prodConfig from './config/prod';

let configStore;

if (process.env.NODE_ENV === 'development') {
  configStore = devConfig;
} else {
  configStore = prodConfig;
}

export default configStore();
