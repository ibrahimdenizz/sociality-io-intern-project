FROM node:14-alpine

RUN mkdir code
WORKDIR /code

COPY yarn.lock package.json  ./

RUN yarn install

CMD [ "yarn", "serve" ]