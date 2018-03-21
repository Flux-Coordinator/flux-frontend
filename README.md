[Sonar Cloud](https://sonarcloud.io/api/project_badges/measure?project=flux-frontend&metric=reliability_rating)

# Flux-Frontend

<div align="center">
  
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

## Ordnerstruktur

Die Ordnerstruktur im **./src** Ordner sieht wie folgt aus:

| Ordner         | Beschreibung                                                                                                                                                                                                   |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| src/api        | Die JS Dateien in diesem Ordner stellen die Anfragen an das backend API.                                                                                                                                       |
| src/components | In diesem Ordner befinden sich die Presentational Components. Merke, dass die CSS und Tests ebenfalls in diesem Ordner zusammen mit ihren Components befinden.                                                 |
| src/containers | In diesem Ordner befinden sich die Container Components. Diese machen die API Calls und besitzen einen State. Merke, dass die CSS und Tests ebenfalls in diesem Ordner zusammen mit ihren Components befinden. |
| src/images     | Hier befinden sich die Bilder, die in der Anwendung verwendet werden.                                                                                                                                          |
| src/index.jsx  | In dieser Datei wird die App initialisiert.                                                                                                                                                                    |
| src/utils      | Alles, was sonst nicht eingeordnet werden kann und keinen eigenen Ordner verdient.                                                                                                                             |
