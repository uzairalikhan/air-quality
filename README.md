# App to fetch Air Quality

## Description:

The application provides functionality to fetch air quality of the mentioned co-ordinates using [IQAir](https://www.iqair.com/).
This application is built on top of [NestJs Framework](https://nestjs.com/) using [NodeJs v18](https://nodejs.org/de/blog/announcements/v18-release-announce/), [Postgress 15](https://www.postgresql.org/about/news/postgresql-15-released-2526/) for database using [Sequelize](https://sequelize.org/) as DB ORM and complete build system and installation is [Dockerized](https://www.docker.com/) so you can start all the services just by executing one single command.


### APIs
Currently we have two API's available:
1. /api/v1/airQuality
It takes two query parameters "latitude" and "longitude" and returns their data.

2. /api/v1/airQuality/mostPolluted
It returns Air Quality for the Paris Zone when its most polluted

```bash
You can test these APIs using swagger, details provided in the last heading
```

### Cron Job
There is a cron job that runs every minute to fetch air quality for the Paris zone and save results in DB.

## API Documentation
API documentation is maintained via swagger. You can also test APIs there.
```bash
# API Docs can be accessed via
 localhost:3000/docs
```

## App Setup
### Prerequisite
Install [Docker](https://docs.docker.com/engine/install/) -> All the required resources (Like NodeJs, Postgresql etc) and dependencies (NPM) are contained inside docker image so you don't have to install them on your local machine.

### Running the App
**Note** Create a new .env file on root of the project directory, for local machine, you can copy envs from .example.env file. You will have to create API Key for iqAir using this link https://www.iqair.com/fr/dashboard/api.
```bash
Create two new variables in .env
IQAIR_BASEURL // The base URL for your iqAir (Ex: https://api.airvisual.com)
IQAIR_APIKEY // Paste your new API Key here
IQAIR_APIVERSION // iqAir api version that you want to use
```

### To Run Inside Docker
```bash
$ npm run start:docker
```

### Without Docker
**NOTE**: If you're running the app without docker then install all the resources(NodeJs, PostgreSQL etc) manually on your machine.
```bash
# Install dependencies
$ npm i

# Start node server
$ npm run start

# Watch mode
$ npm run start:dev

```

## Migration
**Note** If you're running in docker mode, all the migrations and seeders will be executed automatically.
### Inside Docker
```bash
# Execute migrations
$ npm run exec:migration

# Run seeder on dev env
$ npm run exec:seeder
```

### Without Docker
```bash
# Run migration
$ npm run migration

# Run seeder on dev env
$ npm run migration:seed-dev

# Create new migration
$ npm run migration:create

# Create new seeder
$ npm run migration:seed:create
```

## Test

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```
