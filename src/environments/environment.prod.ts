import { AppHelpers } from '../app/app.helpers';

export const environment = {
  production: !AppHelpers.isLocalhost(),
  environment: 'prod',
  ENVIRONMENT_DEV: false,
  API_ENDPOINT: 'http://ec2-54-255-224-130.ap-southeast-1.compute.amazonaws.com:8081/api/v1/',
  ASSET_URL:  ''
};
