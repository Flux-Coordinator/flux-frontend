# Flux-Frontend

<div align="center">

  [![Tested with Jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
  [![GitHub license](https://img.shields.io/github/license/Flux-Coordinator/flux-frontend.svg)](https://github.com/Flux-Coordinator/flux-frontend)
  [![Sonar Cloud Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=flux-frontend&metric=reliability_rating)](https://sonarcloud.io/api/project_badges/measure?project=flux-frontend&metric=reliability_rating)
  [![Sonar Cloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=flux-frontend&metric=coverage)](https://sonarcloud.io/api/project_badges/measure?project=flux-frontend&metric=coverage)
  [![Sonar Cloud Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=flux-frontend&metric=alert_status)](https://sonarcloud.io/api/project_badges/measure?project=flux-frontend&metric=alert_status)
  [![Build Status](https://travis-ci.org/Flux-Coordinator/flux-frontend.svg?branch=master)](https://travis-ci.org/Flux-Coordinator/flux-frontend)
  [![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
  [![Dependencies](https://david-dm.org/Flux-Coordinator/flux-frontend.svg)](https://david-dm.org/Flux-Coordinator/flux-frontend)
  [![DevDependencies](https://david-dm.org/Flux-Coordinator/flux-frontend/dev-status.svg)](https://david-dm.org/Flux-Coordinator/flux-frontend?type=dev)
  [![peerDependency Status](https://david-dm.org/Flux-Coordinator/repo/peer-status.svg)](https://david-dm.org/Flux-Coordinator/flux-frontend?type=peer)

</div>

## How to run this application in development mode

Follow the below guide to run this application in development mode.  
**Prerequisites:** [NodeJS 8](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/en/docs/install) (recommended) or NPM.

1.  Download the repository
2.  Install the dependencies using `yarn` or `npm install`
3.  Run the application using the `yarn start` or the `npm run start` command.

The URI for the connection to the [flux-server](https://github.com/Flux-Coordinator/flux-server) instance needs to be set either as an environment variable REACT_APP_SERVICE_URI or using a `.env` file, in which you have the following content:

```
REACT_APP_SERVICE_URI = <sever_uri>
```

## Run in Production Mode

To run this application in production mode, you need to build it first, using the `yarn build` or `npm run build` command. After the command has run through, you will find the built application in the _/build_ folder. You can deploy that folder on your preferred static webserver or using [serve](https://github.com/zeit/serve).

To install serve globally, you can use the `yarn global add serve` or `npm install -g serve`. After the installation is complete, you can use the command `serve -s build`, where build the _/build_ folder.

If you use a webserver other than serve, you will need to make some changes. Follow the guide [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-apps-with-client-side-routing).

## More informations

For more information about running and deploying the application, you can consult the CRA documentation [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md).
