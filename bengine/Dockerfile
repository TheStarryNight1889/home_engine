FROM oven/bun
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN bun install
COPY src src
RUN bun run build
CMD ["bun", "dist/index.js"]
