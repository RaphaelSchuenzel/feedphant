# tenant

Tenant web application.

## Table of Contents

- [What's What](#whats-what)
- [Installation](#installation)
- [Build Setup](#build-setup)

## What's What

This repository consists of a web application built using [Nuxt.js](https://nuxtjs.org).

Nuxt is a framework based on [Vue.js](https://vuejs.org/).

Application highlights include:

- A highly customizable end-user view.
- A restricted administration panel for tenants.
- A REST [Express](http://expressjs.com/) API, used to interact with tenant data.
- Server-Side Rendering, allowing for strong SEO and a better user experience.
- [Pug](https://pugjs.org/) & [Sass](https://sass-lang.com/) Template Syntax.

## Installation

The installation process consists of 4 steps.

First, clone the repository.

#### Setting up the Database

This project requires a PostgreSQL database. We will use this database to store tenant account data.

To get started, create a new PostgreSQL database. A walkthrough can be found [here](https://www.postgresql.org/docs/9.0/tutorial-createdb.html).

Once set up, run the `base.sql` script found within [api/db](api/db).

#### Configuring

Now that we've set up the database, it's time to configure our application.

Fill out the example config found [here](config/example.config.json), then save it as `config.json` (within the same folder).

## Build Setup

#### Development Enviroment

In order to get our application running, we will have to install it's dependencies.

To do so, run:

``` bash
$ npm install
```

Once all dependencies have been installed, run:

``` bash
$ npm run dev
```

The application is now be running in development mode. 🎉

#### Production Enviroment

Running the application in production mode is largely similar to the process pointed out within the [Installation](#installation) section.

There is, however, a few things that we have to keep in mind.

Ensure that you have _disabled_ the `debug` option within the [config](config).

Further, we're __not__ going to be running `npm run dev`. Instead, the build process now consists of 2 stages.

To build the application, run:

``` bash
$ npm run build
```

Once built, fire up the web server using:

``` bash
$ npm run start
```

The application is now be running in production mode. ✅
