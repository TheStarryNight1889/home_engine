FROM node:16.16.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm install
COPY src src
RUN npm run build
CMD ["node", "dist/index.js"]
