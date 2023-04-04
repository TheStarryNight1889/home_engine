# Dockerfile
FROM node:16.16.0-alpine

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN npm run build

CMD [ "node", ".output/server/index.mjs" ]