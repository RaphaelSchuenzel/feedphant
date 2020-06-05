<p align="center">
    <a href="https://feedphant.com">
        <h3 align="center">Feedphant</h3>
    </a>
    <p align="center">Tenant Web Application</p>
</p>

---

## Table of Contents

- [Introduction](#introduction)
- [Overview](#overview)
- [Installation](#installation)
- [Developing](#developing)
- [Deploying](#deploying)

## Introduction

Within this repository you'll find the main tenant web application.

The application is built to support multi-tenancy at core.

Instances shall be deployed centralized, meaning that there shall *not* be instance of this application for each tenant.

Instead, each tenant will be connecting to a shared instance. Tenants are matched by request URL.

## Overview

The web application built using [Nuxt.js](https://nuxtjs.org).

Nuxt is a framework based on [Vue.js](https://vuejs.org/).

Application highlights include:

- A highly customizable end-user view.
- A restricted administration panel for tenants.
- A REST [Express](http://expressjs.com/) API, used to interact with tenant data.
- Server-Side Rendering, allowing for strong SEO and a better user experience.
- [Pug](https://pugjs.org/) & [Sass](https://sass-lang.com/) Template Syntax.

## Installation

First, clone the repository.

1. Create a PostgreSQL database

This project requires a PostgreSQL database. The database will be used to store tenant data.

To get started, create a new PostgreSQL database. A walkthrough can be found [here](https://www.postgresql.org/docs/9.0/tutorial-createdb.html).

2. Configuration

Fill out the example config found [here](config/example.config.json), then save it as `config.json`.

## Developing

1. Install all dependencies.

``` bash
$ npm install
```

2. Spin up a local web server with hot reloads.

``` bash
$ npm run dev
```

> Tip: For Sequelize to hard-sync the database schema, use `-- sync-hard`. This will delete all tables & create new ones based on the model specifications. **Do not use in production.**

## Deploying

Detailed production documentation coming soon.

---

1. Build the application.

``` bash
$ npm run build
```

2. Fire up a web server.

``` bash
$ npm run start
```
