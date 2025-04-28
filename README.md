# Getting started with [Doltgres](https://github.com/dolthub/doltgresql) and [Prisma](https://www.prisma.io/)

The code is described in detail in [this blog]().

## Installation

```
$ yarn
```

## Add connection env

Add a `.env` file with the following fields:

```shell
DB_HOST="host"
DB_PORT=5432
DB_USER="username"
DB_PASSWORD="password"
DB_NAME="postgres"
DB_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
```

If your database server requires SSL for connections, you should specify the path to the SSL certificate and modify the `DB_URL`. Note that paths to certificates are resolved relative to the `./prisma` directory:

```shell
DB_SSL_PATH="/certificate.pem"
DB_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=require&sslcert=${DB_SSL_PATH}"
```

## Initialize

To create tables in the database, you will use the Prisma migrate dev command:

```
$ npx prisma migrate dev --name init
```

## Seeding the database

To populate the database with data, we will use Prisma Client and run this command:

```
$ npx prisma db seed
```

## Running the scripts

To execute database operations (create tables, commit changes, etc.) using `src/index.ts`, run:

```
npx ts-node src/index.ts
```
