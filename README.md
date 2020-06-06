<p align="center">
    <a href="https://feedphant.com">
        <h3 align="center">Feedphant</h3>
    </a>
    <p align="center">Tenant Web Application</p>
</p>

## Table of Contents

- [Introduction](#introduction)
- [Overview](#overview)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)

## Introduction

Within this repository you'll find the main tenant web application.

The application is built to support multi-tenancy at core.

Instances shall be deployed centralized, meaning that there shall *not* be instance of this application for each tenant.

Instead, each tenant will be connecting to a shared instance. Tenants are matched by request URL.

## Overview

This application is built using [Nuxt.js](https://nuxtjs.org). Nuxt is a framework based on [Vue.js](https://vuejs.org/).

The integrated REST API is built using [Express](https://expressjs.com/) and the [Sequelize ORM](https://sequelize.org/).

Find the API Documentation [here](api/).

Application highlights include:

- A highly customizable end-user view.
- A restricted administration panel for tenants.
- A REST API to interact with tenant data.
- Server-Side Rendering, allowing for strong SEO and a better user experience.
- [Pug](https://pugjs.org/) & [Sass](https://sass-lang.com/) Template Syntax.

## Installation

1. Create a PostgreSQL database

To get started, create a new PostgreSQL database. A walkthrough can be found [here](https://www.postgresql.org/docs/9.0/tutorial-createdb.html).

2. Configure the application

Fill out the example config found [here](config/example.config.json), then save it as `config.json`.

## Development

### Build Process

1. Install all dependencies.

``` bash
$ npm install
```

2. Spin up a local web server with hot reloads.

``` bash
$ npm run dev [-- <arguments>]
```

Available arguments for use *within development only* are:
- `sync-hard` - Have Sequelize hard-sync the database schema. This will delete all tables & create new ones based on the model specifications.
- `log-queries` - Have Sequelize output all performed SQL queries.

## Deployment

Detailed production documentation coming soon.

---

### Build Process

1. Build the application.

``` bash
$ npm run build
```

2. Fire up a web server.

``` bash
$ npm run start
```
