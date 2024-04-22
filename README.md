## Installation

```bash
$  yarn 
```

## Running the app

```bash
# development
$ npm run start

# run migration 
$ npx typeorm migration:run -d dist/toc.js

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

```
## Description
I have created a user module to handle user related issues. then I have created login user add/registration and login api.  

Then I have added the main apis one is for get all user and get users by positionId if I get positionId 1 it will show all user with positionId 2 will all of its child user. 

Here I have used redis to cache the data to reduce execution time and I have used clustering also.
Another way to reduce execution tome is making pagination because we don't need all the data at a time that's why I have cerated a api for pagination.

this 3 api ( get all users, pagination and by positionId ) are protected by JWT.

If you add data by running migration file, you have o flush the redis or add a need user using api , it will flush the redis. 

### Where to improve
one million data is big amount of traffic. For this amount of data or more then data we need to take more initiative like, We can user Kubernetes for auto scaling the application. 

We can use Docker, Jenkins for CICD and Grafana for system monitoring.


### How to deploy
We need Serve for hosting from Amazon, Google Cloud, Azure, Digital Ocean or others. Then we need to install necessary dependencies like NodeJS, docker, kubernetes, Grafana Jenkins, Nginx. Then we can create Jenkinsfile as per our requirement like creating docker file command for Kubernetes configuration and running. Wen need to create Nginx configuration like creating files in sites available and sites enabled and create host file according our domain name. Then we need to our add our domain in hosting provider configuration like route53 in aws.

