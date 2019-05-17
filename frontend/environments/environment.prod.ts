import { AppHelpers } from '../app/app.helpers';

export const environment = {
  production: !AppHelpers.isLocalhost(),
  environment: 'prod',
  ENVIRONMENT_DEV: false,
  API_ENDPOINT: 'http://phongmach.dev/api/v1/',
  HOST_NAME: 'https://lotte.vn',
  ELASTIC_API_ENDPOINT: 'https://els.lotte.vn/api/v1/',
  ASSET_URL:  'shop/'
};
