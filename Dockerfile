FROM node:14.15.1-alpine3.10
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY ./ ./ 
CMD ["npm","run","start"]

RUN if [ "$ENV" = "production" ] ; then yarn client:build:prod ; else yarn client:build ;
