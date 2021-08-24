FROM node:14-alpine

RUN mkdir code
WORKDIR /code

COPY package.json yarn.lock  ./

RUN yarn install
RUN npm install @vue/cli -g

CMD [ "yarn", "serve" ]