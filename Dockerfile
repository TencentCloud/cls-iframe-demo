FROM node:16-alpine as builder

LABEL service=cls_iframe_demo

ENV NODE_ENV build
WORKDIR /BUILD
COPY . /BUILD

RUN npm i -g pm2
RUN npm i

ENV NODE_ENV production

CMD ["pm2-runtime", "start", "app.js"]

EXPOSE 3000
