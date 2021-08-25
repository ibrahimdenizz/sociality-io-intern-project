
#build stage
FROM node:14-alpine AS build

RUN mkdir code
WORKDIR /code

RUN mkdir frontend
COPY ./frontend/yarn.lock ./frontend/package.json ./frontend/
RUN cd frontend && yarn install
COPY ./frontend ./frontend
RUN cd frontend && NODE_ENV=production yarn build

RUN mkdir backend
COPY ./backend/yarn.lock ./backend/package.json ./backend/
RUN cd backend && yarn install
COPY ./backend ./backend

# runtime stage
FROM alpine:3.14

ENV NODE_ENV=production


RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/main' >> /etc/apk/repositories
RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.6/community' >> /etc/apk/repositories

RUN apk add --update nodejs-current mongodb yaml-cpp

RUN mkdir data && cd data && mkdir db

ADD ./scripts/start.sh /start.sh
RUN chmod 755 /start.sh

RUN mkdir code
WORKDIR /code

RUN mkdir dist/
COPY --from=build /code/frontend/dist ./dist
COPY --from=build /code/backend .

CMD ["/bin/sh" , "/start.sh"]