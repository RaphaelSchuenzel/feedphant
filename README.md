# feedphant

⚠️ Disclaimer: This is a legacy, _very_ WIP codebase. This project was discarded in 2020.

A highly-customizable SaaS feedback app designed to support multi-tenancy on a single, shared instance.

Built using [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/) and [Nuxt.js](https://nuxtjs.org).

## Introduction

The repository consists of the [api](packages/api) and [web](packages/web) packages.

The `api` exposes a REST API for the web client to interact with tenant data.

The `web` package contains a web client that utilizes Server Side Rendering to interact with the API and display a highly customizable end-user view.

## Installation

### Development

1. Set up a PostgreSQL database

To get started, create a new PostgreSQL database. A walkthrough can be found [here](https://www.postgresql.org/docs/9.0/tutorial-createdb.html).

2. Configure the application

Fill out the example config found [here](config/example.dev_config.json), then save it as `dev_config.json`.

3. Install all dependencies.

``` bash
$ npm install
```

4. Start a local API server.

``` bash
$ npm run api-dev [-- <arguments>]
```

Available arguments for use *within development only* are:
- `sync-hard` - Have Sequelize hard-sync the database schema. This will delete all tables & create new ones based on the model specifications.
- `log-queries` - Have Sequelize output all performed SQL queries.

5. Spin up a local web server with hot reloads.

``` bash
$ npm run web-dev
```