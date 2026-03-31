FROM node:20-alpine

LABEL service=cls_iframe_demo

ENV NODE_ENV build
WORKDIR /BUILD
COPY . /BUILD

RUN npm config set registry https://mirrors.tencent.com/npm/ --global && \
    npm pkg delete scripts.prepare && \
    npm install --production

ENV NODE_ENV production

CMD ["npm", "start"]

EXPOSE 3000
