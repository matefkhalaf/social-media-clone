## Build
FROM node:13.12.0-alpine as build
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm ci
RUN npm install react-scripts@3.4.1 -g
# Bundle app source
COPY . .
RUN npm run build

## Run 
FROM nginx:alpine
#COPY build  /usr/share/nginx/html
COPY --from=build  /usr/src/app/build  /usr/share/nginx/html