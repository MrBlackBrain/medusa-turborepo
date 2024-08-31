# Medusa Turborepo Starter

This is a starter Turborepo for Medusa.

## Feature and changes from original template

- Added script to run medusa server when store app is building.
- Used yarn as the main package manager. (pnpm had some issues with the original template)
- Added a docker compose file to setup a Postgres database and Redis instance.
- Fixed some lint errors with the original template.

## Using this example

Prepare the environment variables and then run the following command:

```sh
docker compose up --build -d
yarn install
yarn dev
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `store`: [Medusa Next.js Starter Template](https://github.com/medusajs/nextjs-starter-medusa)
- `medusa`: [Medusa server](https://github.com/medusajs/medusa)
- `@repo/ui`: a stub React component library
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

There is a special build script for the medusa store. Because store application neeeds medusa server to be running, to get data to build.
To build all apps and packages, run the following command:

```sh
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```sh
yarn dev
```
