# social-media-clone

Social media clone is a cloud application that implements a simple social media app. The app supports users to do CRUD operations on posts resource. Each user can create, edit, delete a post. Users can see each others posts.

The app is developed as microservices to be containerized using docker and deployed on AWS Kubernetes cluster.

The project is split into 3 parts:
1. Frontend - Single page application implemented using React/Redux toolkit
2. Backend Users API - Node-Express application to authenticate users
2. Backend Posts API - Node-Express application to access posts resource

NGINX is used as a proxy server to run and serve the application.

## Start the project locally

This section will introduce you to how to run and setup the app locally.

### Prerequisite
1. The depends on the Node Package Manager (NPM). You will need to download and install Node from [https://nodejs.com/en/download](https://nodejs.org/en/download/). This will allow you to be able to run `npm` commands.
2. Environment variables will need to be set. These environment variables include database connection details that should not be hard-coded into the application code.

A file named `set_env.sh` has been prepared as an optional tool to help you configure these variables on your local development environment.

3. You will need to have Docker installed and running on your local machine.
4. Mongodb database is used to store application data and sessions. A connection URL is already provided in `set_env.sh`

### Run Docker Containers

* To run the containers locally, run the below to build and run the containers:
    ```bash
    # Remove unused and dangling images
    docker image prune --all
    # Run this command from the directory where you have the "docker-compose-build.yaml" file present
    docker-compose -f docker-compose-build.yaml build --parallel

    # Run the containers
    docker-compose up
    ```

* You can visit `http://localhost:9000/` in your web browser to verify that the application is running. You should see the frontend main page.

* You can register a new user and start creating posts.

## Production Environment

The application is deployed on AWS kubernetes cluster. You can find the deployment scripts under `k8s-deployment-configs`.
Travis CI is also used as CI/CD tool that is triggered for each commit to this repo. Travis CI pipeline builds the updated images and push them to docker hub. 