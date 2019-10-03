import { AppHelpers } from '../app/app.helpers';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: !AppHelpers.isLocalhost(),
  environment: 'stag',
  ENVIRONMENT_DEV: AppHelpers.isLocalhost(),
  API_ENDPOINT: 'http://phongmach.web/api/v1/',
  ASSET_URL:  ''
};
