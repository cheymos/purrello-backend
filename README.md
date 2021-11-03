# 🐱‍👤 Purrello: backend

## Description

Backend part of the Purrello project which includes CRUD operations, authentication using JWT, pagination and etc.

## Installation

```bash
$ yarn install
```

## Usage

Copy the example config files - _jwt.config.example.ts, orm.config.example.ts_ - `src\configs` and make the required configuration changes in the config files.

For example:

```bash
$ cp jwt.config.example.ts jwt.config.ts
```

And...

```bash
$ cp orm.config.example.ts orm.config.ts
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
