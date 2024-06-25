# Getting started with [Dolt](https://doltdb.com) and [Prisma](https://www.prisma.io/)

The code is described in detail in [this blog]().

## Installation

```
% npm install
```
If you are using yarn:

```
% yarn
```

## Add connection env

Add a `.env` file with the following fields:

```shell
DB_HOST="host"
DB_PORT=3306
DB_USER="username"
DB_PASSWORD="password"
DB_NAME="database"
DB_SSL_PATH="certificate"
DB_URL="mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?sslmode=require&sslcert=${DB_SSL_PATH}"
```

`DB_SSL_PATH` is only necessary if your database server uses SSL. Certificate paths are resolved relative to the `./prisma` folder. If your database server does not use SSL, the `DB_URL` should be `mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`
