# 🐱 Purrello: backend

## Description

Backend part of the Purrello project which includes CRUD operations, authentication using JWT, pagination and etc.

[See database structure.](https://dbdiagram.io/d/61793363fa17df5ea6715ca6)

## Installation

```bash
$ yarn install
```

## Usage

Copy the example env file and make the required configuration changes in the .env file

For example:

```bash
$ cp env.example .env
```

## Running the app

Run migrations first:

```bash
$ yarn migration:run
```

And seeds (optionally):

```bash
$ yarn seed:run
```

After:

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
