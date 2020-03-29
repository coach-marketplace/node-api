# Backend

This backend is made with NodeJS

## Prerequisite

- You need NodeJS >= v10.15.1 installed on your machine
- Be sure you have the env file with all the variable. It should be `env/(local|test).env`

## Run the project

You can run the project using different environment mode.

#### Local:

> In this case you need to have mongodb running on `27017`, you don't need to
> have an internet connection to make it work except for some services like
> Google.

```
npm run start:local
```

#### Dev:

> Dev is the same of local but the difference is the DB is on Mongo Atlas so
> you don't need to have it running locally.

```
npm run start:dev
```

## Launch tests

#### Local:

> Running the test locally, you need to have mongodb running on `27017` and you
> don't need an internet connection

```
npm run test:local
```

#### Cloud:

> Running test using the database on Mongo Atlas, use for Github actions

```
npm run test:cloud
```

## Run prettier to format code

```
npm run prettier
```

## Lint code

```
npm run lint
```

## Documentation

We use Swagger to document the API, when the app is running locally, you can go on `http://localhost:5555/doc` to read it.

You will also find documentation on the Wiki.
