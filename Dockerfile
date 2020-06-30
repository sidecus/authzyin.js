#
# build image
#

FROM node:lts-alpine3.9 as build

#RUN apk add tree
WORKDIR /usr/app

######### Distinct layers for yarn install
# copy package and yarn install for the lib as a distinct layer
COPY ./package.json ./yarn.lock ./
RUN yarn install

# copy package and yarn install for the example app as a distinct layer
WORKDIR /usr/app/example
COPY ./example/package.json ./example/yarn.lock ./
RUN yarn install

######### Distinct layers for build
# copy everything else
WORKDIR /usr/app
COPY . ./
#RUN tree /usr/app -a

# build lib
WORKDIR /usr/app
RUN yarn build

# build example app
WORKDIR /usr/app/example
RUN yarn build

#
# runtime image
#
FROM nginx:alpine as runtime
COPY --from=build /usr/app/example/build /usr/share/nginx/html
