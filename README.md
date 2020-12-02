# URL-Shortener

This repository was created to contain an application to shorten URLs into unique 8 character URLs following a specified domain (pbid.io)

The tech stack used in this application is as follows

  * vue.js, with vanilla CSS styling
  * express driven API, created in Typescript
  * appropriate tests created with jest
  * MongoDB
  * Docker

## Project Installation

From the project root, run the follwoing 

```
npm install
```

## Starting the application

### 1. Starting the MongoDB container

In the terminal, from the project root, navigate to './test/mongoDb Instances' and run the following command

```
docker-compose up
```

### 2. Run server

From a new terminal, making sure to keep the docker running, run the following from the project root

```
npm run start-dev
```

### 3. Compiles and loads Front end Vue Application

In a new terminal, making sure to keep the previous terminals running, run the following command from the project root in the terminal

```
npm run start
```

You should now be able to navigate to 'localhost:8080' to see the front end application

## Running the tests

Making sure that the MongoDb container has been started, run the following command from the project root in the terminal

```
npm run test
```

## Endpoints 

### Front end Application

To access the front end Application, navigate to localhost:8080 (or wherever is specified upon running the vue.js application)

### Back end Get request (using postman)

Making sure that the MongoDb container is up and running, enter the following details into postman

#### Get all

Path: 'http://localhost:3000/url/geturl'
Request Type: 'GET'

Click send. You should now be able to see all of the previously entered urls

#### Create new shortened url

Path: 'http://localhost:3000/url/newurl
Request Type: 'POST'

In 'Headers', use the key 'Content-Type' and the Value 'application/json'

In Body, click on 'raw', then enter the url you want to be shortened by following this example:

```
{
  "originalUrl": "inserturlhere"
}
```

Click send. You should now see a message that says 'Added'.

To check that the user has been added, run the Get request

## Caviats

* It is assumed that this application would deploy alongside a real mongoDb instance. Local instance is created in the test environment in order to mimic production conditions.

* As a local instance of the mongoDb is currently being used for both development and test, upon running the tests, the database will be cleared to make sure tests run.

## Future updates

* Restyling the front end application to make it look more appealing, and have nicer formatting.

* Adding front end unit tests and unit tests to mock the backend server endpoints

* Adding more functionality to the backend, such as updating a previously entered url and being able to delete specific urls

* Connecting application to a real mongoDb instance, meaning the local instance would only be used for testing
